#!/usr/bin/env node
import {readFile,writeFile,mkdir,copyFile,access} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {catalog,challenge,root,evaluate,record,simulate} from '../engine/core.mjs';
import {serve} from '../engine/server.mjs';
const [cmd='help',id,...flags]=process.argv.slice(2);
function printResult(results){for(const t of results)console.log((t.ok?'PASS':'FAIL')+' '+t.name+(t.error?': '+t.error:''));console.log(`${results.filter(x=>x.ok).length}/${results.length} passed`);}
try{
 if(cmd==='list'){for(const c of await catalog())console.log(c.id.padEnd(18)+c.title);}
 else if(cmd==='serve'||cmd==='start'){const port=Number(id||4173);if(!Number.isInteger(port)||port<0||port>65535)throw Error('Invalid port');const s=serve(port);s.on('listening',()=>console.log('Build The World: http://127.0.0.1:'+s.address().port));s.on('error',e=>{console.error(e.message);process.exitCode=1;});}
 else if(cmd==='init'||cmd==='break'){
  const c=await challenge(id),repair=cmd==='break',folder=path.join(root,'work',id+(repair?'-repair':''));await mkdir(folder,{recursive:true});const target=path.join(folder,'solution.mjs');
  let exists=false;try{await access(target);exists=true;}catch{}
  if(exists&&!flags.includes('--force'))throw Error('Workspace exists. Use --force only to replace your work.');
  await copyFile(path.join(root,'challenges',id,repair?'broken':'starter','solution.mjs'),target);
  console.log((repair?'Failure: '+c.scenario+'\n':'')+'Edit '+target+'\nTest: node bin/btw.mjs test '+id+(repair?' --repair':''));
 }
 else if(cmd==='test'||cmd==='benchmark'){
  const c=await challenge(id),repair=flags.includes('--repair'),reference=flags.includes('--reference');const file=reference?path.join(root,'challenges',id,'solution/solution.mjs'):path.join(root,'work',id+(repair?'-repair':''),'solution.mjs');
  const start=performance.now(),results=await evaluate(c,file);printResult(results);
  if(cmd==='benchmark')console.log('Acceptance-suite duration: '+(performance.now()-start).toFixed(2)+' ms (includes worker startup; not production throughput).');
  if(!reference)await record(id,repair?'repair':'build',results,file);if(results.some(t=>!t.ok))process.exitCode=1;
 }
 else if(cmd==='hint'){const c=await challenge(id);console.log(c.hints.join('\n'));}
 else if(cmd==='show'){const c=await challenge(id);console.log(c.title+'\n'+c.spec);}
 else if(cmd==='simulate'){console.log(JSON.stringify(simulate((id||'').split(',').filter(Boolean)),null,2));}
 else if(cmd==='progress'){try{console.log(await readFile(path.join(root,'work/progress.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;console.log('No recorded attempts yet.');}}
 else if(cmd==='badge'){
  const c=await challenge(id),p=JSON.parse(await readFile(path.join(root,'work/progress.json'),'utf8'));if(!p[id]?.build||p[id].build.passed!==p[id].build.total)throw Error('Pass the build tests first.');
  const sourceHash=createHash('sha256').update(await readFile(path.join(root,'work',id,'solution.mjs'))).digest('hex');if(sourceHash!==p[id].build.sourceHash)throw Error('Code changed since the tests passed. Run the build tests again.');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="100"><rect width="520" height="100" rx="12" fill="#101c2a"/><text x="24" y="35" fill="#7ae9be" font-family="sans-serif" font-size="16">BUILD THE WORLD</text><text x="24" y="69" fill="white" font-family="sans-serif" font-size="21">${c.title}</text></svg>`;
  await writeFile(path.join(root,'work',id+'-badge.svg'),svg);console.log('Saved work/'+id+'-badge.svg (local self-reported achievement).');
 }
 else if(cmd==='validate'){
  const cs=await catalog(),ids=new Set();for(const c of cs){if(ids.has(c.id)||!/^[-a-z0-9]+$/.test(c.id))throw Error('Invalid or duplicate id');ids.add(c.id);if(!c.cases.length||!c.hints.length)throw Error('Missing tests or hints');for(const p of c.prerequisites)await challenge(p);for(const kind of ['starter','broken','solution'])await access(path.join(root,'challenges',c.id,kind,'solution.mjs'));}
  console.log('Validated '+cs.length+' challenge packs.');
 }
 else if(cmd==='create'){
  if(!/^[a-z][a-z0-9-]{1,40}$/.test(id||''))throw Error('Use a lowercase challenge id');const folder=path.join(root,'contributions',id);await mkdir(folder,{recursive:true});const target=path.join(folder,'challenge.json');try{await access(target);throw Error('Contribution already exists');}catch(e){if(e.code!=='ENOENT')throw e;}
  await writeFile(target,JSON.stringify({id,title:'Build '+id,category:'Community',description:'Describe the learning goal',api:'solve(input)',spec:'Write an explicit input and output contract',hints:['Add a hint'],exports:['solve'],cases:[{name:'example',body:'equal(solve(1),1);'}],prerequisites:[]},null,2));console.log('Created '+target+'. See CONTRIBUTING.md for promotion into the catalog.');
 }
 else console.log(`BUILD THE WORLD 0.1.0\n\nnode bin/btw.mjs <command> [challenge]\n\nlist | serve [port] | show <id> | init <id> | test <id>\nbreak <id> | test <id> --repair | hint <id>\nbenchmark <id> | progress | badge <id> | validate | create <id>\nsimulate internet,dns,auth,payments,database\n\nUse --reference with test to verify a supplied solution.\nNo package installation, cloud account or API key needed.`);
}catch(e){console.error(e.message);process.exitCode=1;}
