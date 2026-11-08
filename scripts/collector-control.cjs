'use strict';
const {fork}=require('node:child_process');const path=require('node:path');
function createCollector(spawn=fork){
 let child=null;let status={phase:'idle',message:'Chrome 로그인 후 동기화하세요.',revision:0};
 function start(kind){
  if(child)throw Error('이미 작업 중입니다.');
  const publishing=kind==='publish';
  status={...status,phase:publishing?'publishing':'opening',message:publishing?'GitHub에 업로드 중입니다.':'Chrome을 여는 중입니다.'};
  child=spawn(path.join(__dirname,publishing?'publish.cjs':'sync-pinterest.cjs'),[],{silent:true});
  const current=child;let last='';
  function log(chunk){const line=String(chunk).trim();if(line){last=line.slice(-500);status.message=last}}
  current.stdout.on('data',log);current.stderr.on('data',log);
  current.on('message',m=>{if(m.type==='login-ready')status={...status,phase:'login',message:'Chrome에서 Pinterest 로그인 후 보드를 열고, 여기서 지금 동기화를 누르세요.'}});
  current.on('error',e=>{status={...status,phase:'error',message:e.message}});
  current.on('exit',code=>{child=null;status={...status,phase:code===0?'done':'error',revision:status.revision+1,message:code===0?(publishing?'업로드 완료. GitHub Pages 배포 후 사이트에 반영됩니다.':'수집 완료. 자료를 확인한 후 사이트 반영을 누르세요.'):(last||'작업 실패. Chrome과 Git 로그인을 확인하세요.')}});
 }
 return {status:()=>({...status}),login:()=>start('login'),sync:()=>{if(status.phase!=='login'||!child)throw Error('먼저 Chrome 로그인을 열고 보드를 확인하세요.');status={...status,phase:'syncing',message:'새 핀을 수집하고 있습니다.'};child.send({type:'continue'})},publish:()=>start('publish')};
}
module.exports={createCollector};
