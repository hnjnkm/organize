'use strict';
function mergeNew(existing, incoming) {
 const ids=new Set(existing.map(x=>String(x.id))); const added=[];
 for(const row of incoming) if(!ids.has(String(row.id))){ids.add(String(row.id));added.push(row)}
 return {items:[...added,...existing],added:added.length};
}
function pinId(url){return String(url).match(/\/pin\/(\d+)\//)?.[1]||null}
function allowedMedia(url){try{const u=new URL(url);return u.protocol==='https:'&&(u.hostname==='pinimg.com'||u.hostname.endsWith('.pinimg.com'))}catch{return false}}
module.exports={mergeNew,pinId,allowedMedia};
