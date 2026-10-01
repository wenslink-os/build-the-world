import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {Worker} from 'node:worker_threads';
import {createHash} from 'node:crypto';
export const root=fileURLToPath(new URL('../',import.meta.url));
export async function catalog(){return JSON.parse(await readFile(path.join(root,'web/catalog.json'),'utf8'));}
export async function challenge(id){const c=(await catalog()).find(c=>c.id===id);if(!c)throw Error('Unknown challenge: '+id);return c;}
export async function evaluate(c,file,timeout=4000){
 return new Promise((resolve,reject)=>{
  const worker=new Worker(new URL('./runner.mjs',import.meta.url),{workerData:{challenge:c,file:path.resolve(file)},resourceLimits:{maxOldGenerationSizeMb:64}});
  const timer=setTimeout(()=>{worker.terminate();reject(Error('Execution timed out'));},timeout);
  worker.once('message',r=>{clearTimeout(timer);resolve(r);worker.terminate();});
  worker.once('error',e=>{clearTimeout(timer);reject(e);});
  worker.once('exit',code=>{clearTimeout(timer);if(code!==0)reject(Error('Worker exited: '+code));});
 });
}
export async function record(id,mode,result,sourceFile){
 const file=path.join(root,'work/progress.json');await mkdir(path.dirname(file),{recursive:true});
 let progress={};try{progress=JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
 progress[id]??={};progress[id][mode]={passed:result.filter(t=>t.ok).length,total:result.length,at:new Date().toISOString(),sourceHash:createHash('sha256').update(await readFile(sourceFile)).digest('hex')};
 await writeFile(file,JSON.stringify(progress,null,2));
}
export function simulate(failures=[],policy={cache:true,localLogin:true,queue:true}){
 const down=new Set(failures),network=down.has('internet')||down.has('dns');
 const auth=network||down.has('auth'),payments=network||down.has('payments'),db=down.has('database');
 return [
  {feature:'Browse catalog',state:db||network?(policy.cache?'degraded':'unavailable'):'available',reason:db||network?'Cached data may be stale.':'Live data available.'},
  {feature:'Sign in',state:auth?(policy.localLogin?'degraded':'unavailable'):'available',reason:auth?'Only previously enrolled local users can sign in.':'Identity provider available.'},
  {feature:'Pay for an order',state:payments?'unavailable':'available',reason:payments?'Never show an unconfirmed payment as successful.':'Payment service available.'},
  {feature:'Save draft order',state:db||network?(policy.queue?'degraded':'unavailable'):'available',reason:db||network?'Local draft awaits idempotent sync.':'Draft saved to database.'}
 ];
}
