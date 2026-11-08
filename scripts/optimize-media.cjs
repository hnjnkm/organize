'use strict';
const fs=require('node:fs/promises');const path=require('node:path');const os=require('node:os');const {promisify}=require('node:util');const execFile=promisify(require('node:child_process').execFile);
async function optimizeMedia(bytes,mime){
 if(mime.startsWith('image/')){
  const sharp=require('sharp');const metadata=await sharp(bytes).metadata();
  if((metadata.pages||1)>1)return {bytes,mime}; // Do not flatten animated images.
  const result=await sharp(bytes).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:78,effort:5}).toBuffer();
  return result.length<bytes.length?{bytes:result,mime:'image/webp'}:{bytes,mime};
 }
 if(mime==='video/mp4'){
  const dir=await fs.mkdtemp(path.join(os.tmpdir(),'organize-video-'));
  try{
   const input=path.join(dir,'input.mp4'),output=path.join(dir,'output.mp4');await fs.writeFile(input,bytes);
   await execFile(require('@ffmpeg-installer/ffmpeg').path,['-nostdin','-v','error','-i',input,'-map','0:v:0','-map','0:a?','-vf',"scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2",'-c:v','libx264','-crf','30','-preset','medium','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',output],{timeout:300000,maxBuffer:1024*1024});
   const result=await fs.readFile(output);return result.length<bytes.length?{bytes:result,mime}:{bytes,mime};
  }finally{await fs.rm(dir,{recursive:true,force:true})}
 }
 return {bytes,mime};
}
module.exports={optimizeMedia};
