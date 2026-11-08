'use strict';
const fs=require('node:fs');const path=require('node:path');const {execFileSync}=require('node:child_process');
const {mergeNew,pinId,allowedMedia}=require('./sync-core.cjs');
const root=path.join(__dirname,'..');const dataFile=path.join(root,'data/snapshot.json');
const privateDir=path.join(root,'private');fs.mkdirSync(privateDir,{recursive:true});
const lock=path.join(privateDir,'sync.lock');
let lockFd;try{lockFd=fs.openSync(lock,'wx')}catch{throw Error('다른 동기화가 실행 중입니다. 종료된 경우에만 private/sync.lock을 삭제하세요.')}
let context;
async function main(){
 if(!fs.existsSync(dataFile)){
  const dest=path.join(root,'work','bootstrap-'+Date.now());fs.mkdirSync(path.dirname(dest),{recursive:true});
  execFileSync('git',['clone','--depth','1','--branch','gh-pages','https://github.com/hnjnkm/organize.git',dest],{stdio:'inherit'});
  const d=JSON.parse(fs.readFileSync(path.join(dest,'data/snapshot.json'),'utf8'));
  for(const x of d.items)for(const k of ['image','videoSrc'])if(x[k]?.startsWith('./media/')){
   const f=path.resolve(dest,x[k]);if(!f.startsWith(path.join(dest,'media')+path.sep))throw Error('Invalid media path');
   const ext=path.extname(f).slice(1);const mime=k==='videoSrc'?'video/mp4':({'jpg':'image/jpeg','png':'image/png','gif':'image/gif','webp':'image/webp'}[ext]);if(!mime)throw Error('Unknown media type');
   x[k]=`data:${mime};base64,${fs.readFileSync(f).toString('base64')}`;
  }
  fs.mkdirSync(path.dirname(dataFile),{recursive:true});fs.writeFileSync(dataFile,JSON.stringify(d),{flag:'wx'});
 }
 if(process.argv.includes('--prepare'))return;
 const data=JSON.parse(fs.readFileSync(dataFile,'utf8'));const known=new Set(data.items.map(x=>String(x.id)));
 const {chromium}=require('playwright');
 context=await chromium.launchPersistentContext(path.join(privateDir,'pinterest-chrome'),{channel:'chrome',headless:false,viewport:{width:1440,height:1000}});
 const page=context.pages()[0]||await context.newPage();
 await page.goto('https://www.pinterest.com/hnjnkm_/research-gui/',{waitUntil:'domcontentloaded',timeout:60000});
 if(process.send){process.send({type:'login-ready'});await new Promise(resolve=>process.once('message',resolve));}
 else {const rl=require('node:readline/promises').createInterface({input:process.stdin,output:process.stdout});await rl.question('Chrome에서 보드 로그인 후 Enter: ');rl.close();}
 if(!/^https:\/\/([a-z]+\.)?pinterest\.com\/hnjnkm_\/research-gui\/?(?:[?#]|$)/.test(page.url()))throw Error('대상 보드 페이지가 아닙니다.');
 const found=new Map();let stable=0,rounds=0;
 for(;rounds<60&&stable<6;rounds++){
  const before=found.size;
  const rows=await page.locator('a[href*="/pin/"]').evaluateAll(links=>links.map(a=>{const img=a.querySelector('img');return {url:a.href,title:img?.alt||'',image:img?.currentSrc||img?.src||'',width:img?.naturalWidth||0,height:img?.naturalHeight||0}}));
  for(const x of rows){const id=pinId(x.url);if(id&&allowedMedia(x.image))found.set(id,{...x,id})}
  stable=found.size===before?stable+1:0;await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(1500);
 }
 if(!found.size)throw Error('핀을 읽지 못했습니다. 로그인/보드 로딩을 확인하세요. 기존 자료는 변경하지 않았습니다.');
 const added=[],failed=[];
 async function download(url){
  if(!allowedMedia(url))throw Error('허용하지 않은 미디어 주소');
  const r=await context.request.get(url,{timeout:60000,maxRedirects:0});if(!r.ok())throw Error(`미디어 HTTP ${r.status()}`);
  const mime=r.headers()['content-type']?.split(';')[0];if(!/^(image\/|video\/mp4)/.test(mime||''))throw Error('미디어 형식 오류');
  const body=await r.body();if(body.length>50*1024*1024)throw Error('50MB 초과 미디어');return {uri:`data:${mime};base64,${body.toString('base64')}`,mime};
 }
 const detail=await context.newPage();
 for(const row of found.values()){
  if(known.has(row.id))continue;
  try{
   const response=await detail.goto(row.url,{waitUntil:'domcontentloaded',timeout:45000});
   if(!response||!response.ok()||pinId(detail.url())!==row.id)throw Error('핀 상세 페이지를 열지 못했습니다.');
   const meta=await detail.evaluate(()=>({title:document.querySelector('meta[property="og:title"]')?.content,description:document.querySelector('meta[property="og:description"]')?.content,image:document.querySelector('meta[property="og:image"]')?.content,video:document.querySelector('meta[property="og:video:secure_url"]')?.content||document.querySelector('meta[property="og:video"]')?.content}));
   const imageUrl=allowedMedia(meta.image)?meta.image:row.image;const image=await download(imageUrl);if(!image.mime.startsWith('image/'))throw Error('이미지 응답이 아닙니다.');
   const title=(meta.title||row.title||`Pinterest ${row.id}`).trim();
   const x={id:row.id,title,titles:{ko:title,en:''},originalTitle:title,description:meta.description||'',source:`https://www.pinterest.com/pin/${row.id}/`,image:image.uri,imageSourceUrl:imageUrl,width:row.width,height:row.height,field:'',type:'이미지 스터디',tags:[],notes:'',favorite:false,palette:[],colors:[],tones:[],color:'',hue:0,classification:'신규 핀 · 분류 검토 필요',titleOrigin:'pinterest',addedAt:new Date().toISOString()};
   if(allowedMedia(meta.video)&&/\.mp4(?:\?|$)/i.test(meta.video)){try{x.videoSrc=(await download(meta.video)).uri;x.isVideo=true}catch(e){console.log(`영상 ${row.id}: ${e.message} (이미지와 원본 링크 보존)`);}}
   added.push(x);console.log(`추가: ${row.id} ${title.slice(0,70)}`);
  }catch(e){failed.push(row.id);console.log(`실패: ${row.id}: ${e.message}`)}
 }
 const merged=mergeNew(data.items,added);
 if(merged.added){
  fs.copyFileSync(dataFile,dataFile+'.backup-'+Date.now());data.items=merged.items;
  data.state={...data.state,message:`수동 동기화 · ${merged.added}개 추가`,lastSuccess:new Date().toISOString(),added:merged.added};
  fs.writeFileSync(dataFile+'.tmp',JSON.stringify(data));fs.renameSync(dataFile+'.tmp',dataFile);
 }
 console.log(`보드에서 확인 ${found.size}개 / 신규 ${merged.added}개 / 실패 ${failed.length}개. 전체 수집을 보장하지 않습니다. 직접 MP4가 노출되지 않는 영상은 원본 링크로 확인하세요.`);
 console.log('npm start로 확인 후 PUBLISH.cmd를 실행하면 GitHub 사이트를 갱신합니다. 브라우저에서 편집한 정보는 JSON 백업으로 별도 보관하세요.');
 if(failed.length)process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1}).finally(async()=>{if(context)await context.close();fs.closeSync(lockFd);fs.unlinkSync(lock)});
