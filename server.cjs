'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT || 4318);
const routes = {
  '/': ['public/index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['public/styles.css', 'text/css; charset=utf-8'],
  '/app.js': ['public/app.js', 'text/javascript; charset=utf-8'],
  '/menus.js': ['public/menus.js', 'text/javascript; charset=utf-8'],
  '/data/snapshot.json': ['data/snapshot.json', 'application/json; charset=utf-8'],
};
function createServer(collector = require('./scripts/collector-control.cjs').createCollector()) {
  return http.createServer((req, res) => {
    if (!['127.0.0.1:'+req.socket.localPort, 'localhost:'+req.socket.localPort].includes(req.headers.host)) {
      res.writeHead(403).end('Forbidden'); return;
    }
    const apiPath = new URL(req.url, 'http://localhost').pathname;
    if(apiPath.startsWith('/api/')) {
      const reply=(code,body)=>{res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'}).end(JSON.stringify(body));};
      if(apiPath==='/api/status'&&req.method==='GET'){reply(200,collector.status());return;}
      if(req.method==='POST'&&['/api/login','/api/sync','/api/publish'].includes(apiPath)){
        if(req.headers.origin!=='http://'+req.headers.host){reply(403,{error:'Origin rejected'});return;}
        try {collector[apiPath.slice(5)]();reply(202,{ok:true});}catch(e){reply(409,{error:e.message});}return;
      }
      reply(404,{error:'Not found'});return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, {Allow:'GET, HEAD'}).end(); return;
    }
    const route = routes[new URL(req.url, 'http://localhost').pathname];
    if (!route) { res.writeHead(404).end('Not found'); return; }
    const file = path.join(root, route[0]);
    fs.stat(file, (error, stat) => {
      if (error) { res.writeHead(404).end('Missing file; import your snapshot first.'); return; }
      res.writeHead(200, {'Content-Type':route[1], 'Content-Length':stat.size,
        'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff',
        'Cross-Origin-Resource-Policy':'same-origin'});
      if (req.method === 'HEAD') res.end();
      else fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
    });
  });
}
if (require.main === module) {
  createServer().listen(port, '127.0.0.1', () => {console.log(`organize: http://127.0.0.1:${port}`);if(process.platform==='win32'&&process.argv.includes('--open'))require('node:child_process').spawn('explorer.exe',[`http://127.0.0.1:${port}`],{stdio:'ignore'});});
}
module.exports = {createServer};
