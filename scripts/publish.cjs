'use strict';
const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');const {execFileSync}=require('node:child_process');const {mergeNew}=require('./sync-core.cjs');
const root=path.join(__dirname,'..');
const target=process.env.PAGES_OUTPUT?path.resolve(process.env.PAGES_OUTPUT):path.join(root,'work','publish-'+Date.now());fs.mkdirSync(path.dirname(target),{recursive:true});
function git(args){return execFileSync('git',args,{cwd:target,stdio:'inherit'})}
execFileSync('git',['clone','--depth','1','--branch','gh-pages','https://github.com/hnjnkm/organize.git',target],{stdio:'inherit'});
const local=JSON.parse(fs.readFileSync(path.join(root,'data/snapshot.json'),'utf8'));
const remote=JSON.parse(fs.readFileSync(path.join(target,'data/snapshot.json'),'utf8'));
const merged=mergeNew(remote.items,local.items);remote.items=merged.items;
if(merged.added)remote.state={...remote.state,message:`수동 동기화 · ${merged.added}개 추가`,lastSuccess:new Date().toISOString(),added:merged.added};
function unpack(value){
 if(Array.isArray(value))return value.map(unpack);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,unpack(v)]));
 if(typeof value==='string'){
  const match=value.match(/^data:((?:image|video)\/[^;]+);base64,([\s\S]+)$/);
  if(match){const bytes=Buffer.from(match[2],'base64');const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif','video/mp4':'mp4'}[match[1]];if(!ext)throw Error('지원하지 않는 형식: '+match[1]);
   const name='media/'+crypto.createHash('sha256').update(bytes).digest('hex')+'.'+ext;fs.mkdirSync(path.join(target,'media'),{recursive:true});fs.writeFileSync(path.join(target,name),bytes);return './'+name;}
 }
 return value;
}
fs.writeFileSync(path.join(target,'data/snapshot.json'),JSON.stringify(unpack(remote)));
for(const name of ['index.html','styles.css','app.js','menus.js']){
 let text=fs.readFileSync(path.join(root,'public',name),'utf8');
 if(name==='index.html')text=text.replace(/(src|href)="\/(styles.css|app.js|menus.js)"/g,'$1="./$2"');
 if(name==='app.js')text=text.replace("fetch('/data/snapshot.json')","fetch('./data/snapshot.json')");
 fs.writeFileSync(path.join(target,name),text);
}
fs.writeFileSync(path.join(target,'.nojekyll'),'');
if(process.argv.includes('--build-only')){fs.rmSync(path.join(target,'.git'),{recursive:true,force:true});console.log('배포 파일 준비 완료');process.exit(0)}
git(['add','.']);
const changed=execFileSync('git',['diff','--cached','--name-only'],{cwd:target,encoding:'utf8'}).trim();
if(!changed){console.log('변경 사항 없음');process.exit(0)}
git(['-c','user.name=organize sync','-c','user.email=organize-sync@users.noreply.github.com','commit','-m',`Sync Pinterest: ${merged.added} new pins`]);
git(['push','origin','gh-pages']);
console.log('GitHub 업로드 완료. Pages 배포가 끝나면 https://hnjnkm.github.io/organize/ 에 반영됩니다.');
