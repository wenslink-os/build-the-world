import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {root} from './core.mjs';
export function serve(port=4173){
 const server=http.createServer(async(req,res)=>{
  try{
   if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
   const url=new URL(req.url,'http://localhost'),p=decodeURIComponent(url.pathname);
   let file;if(p==='/engine/harness.mjs')file=path.join(root,'engine/harness.mjs');else{
    file=path.resolve(root,'web','.'+(p==='/'?'/index.html':p));
    const web=path.join(root,'web');if(!file.startsWith(web+path.sep)){res.writeHead(403);res.end();return;}
   }
   const body=await readFile(file),types={'.html':'text/html','.css':'text/css','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml'};
   res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-eval' blob:; worker-src 'self' blob:; style-src 'self'; img-src 'self' data:; connect-src 'self' blob:"});res.end(req.method==='HEAD'?undefined:body);
  }catch(e){res.writeHead(e.code==='ENOENT'?404:400);res.end('Request could not be served');}
 });
 server.listen(port,'127.0.0.1');return server;
}
