const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createServer} = require('../server.cjs');
test('static server serves UI and blocks private paths and foreign hosts', async () => {
 const server=createServer(); await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try {
  const url=`http://127.0.0.1:${server.address().port}`;
  const headers={Host:'127.0.0.1:4318'};
  const page=await fetch(url,{headers}); assert.equal(page.status,200); assert.match(await page.text(),/<h1>organize<\/h1>/);
  assert.equal((await fetch(url+'/.git/config',{headers})).status,404);
  assert.equal(await new Promise(resolve=>{require('node:http').get(url,{headers:{Host:'untrusted.example'}},r=>{r.resume();resolve(r.statusCode)})}),403);
  assert.equal((await fetch(url,{headers,method:'POST'})).status,405);
 } finally {await new Promise(r=>server.close(r));}
});
const file=path.join(__dirname,'../data/snapshot.json');
test('imported collection retains unique IDs, embedded media and catalog', {skip:!fs.existsSync(file)}, () => {
 const d=JSON.parse(fs.readFileSync(file));
 assert.ok(d.items.length>0); assert.equal(new Set(d.items.map(x=>x.id)).size,d.items.length);
 assert.ok(d.catalog); for(const x of d.items) {assert.match(x.image,/^data:image\//); if(x.videoSrc)assert.match(x.videoSrc,/^data:video\//);}
});
