import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {mkdtemp,writeFile,rm,readFile} from 'node:fs/promises';
import os from 'node:os';
import {catalog,root,evaluate,simulate} from '../engine/core.mjs';
import {simulate as browserSimulate} from '../web/simulator.mjs';
import {serve} from '../engine/server.mjs';
const labs=await catalog();
for(const c of labs){
 test(c.id+' reference passes every acceptance test',async()=>{const r=await evaluate(c,path.join(root,'challenges',c.id,'solution/solution.mjs'));assert.equal(r.length,c.cases.length);assert.ok(r.every(t=>t.ok),JSON.stringify(r));});
 test(c.id+' broken implementation exposes a failure',async()=>{const r=await evaluate(c,path.join(root,'challenges',c.id,'broken/solution.mjs'));assert.ok(r.some(t=>!t.ok));});
 test(c.id+' starter does not falsely pass',async()=>{const r=await evaluate(c,path.join(root,'challenges',c.id,'starter/solution.mjs'));assert.ok(r.some(t=>!t.ok));});
}
test('worker terminates an infinite loop',async()=>{const d=await mkdtemp(path.join(os.tmpdir(),'btw-'));try{const f=path.join(d,'loop.mjs');await writeFile(f,'while(true){}');await assert.rejects(evaluate(labs[0],f,150),/timed out/);}finally{await rm(d,{recursive:true,force:true});}});
test('invalid source produces useful failures',async()=>{const d=await mkdtemp(path.join(os.tmpdir(),'btw-'));try{const f=path.join(d,'bad.mjs');await writeFile(f,'export function {');const r=await evaluate(labs[0],f);assert.ok(r.every(t=>!t.ok&&t.error));}finally{await rm(d,{recursive:true,force:true});}});
test('offline payment never becomes available through queuing',()=>{assert.equal(simulate(['internet']).find(x=>x.feature==='Pay for an order').state,'unavailable');});
test('all simulator combinations agree across CLI and browser',()=>{const names=['internet','dns','auth','payments','database'];for(let n=0;n<32;n++)for(let p=0;p<8;p++){const f=names.filter((_,i)=>n&(1<<i)),policy={cache:!!(p&1),localLogin:!!(p&2),queue:!!(p&4)};assert.deepEqual(simulate(f,policy),browserSimulate(f,policy));}});
test('local server serves assets and limits methods',async()=>{const s=serve(0);await new Promise(resolve=>s.once('listening',resolve));const base='http://127.0.0.1:'+s.address().port;try{assert.equal((await fetch(base)).status,200);assert.equal((await fetch(base+'/worker.mjs')).status,200);assert.equal((await fetch(base+'/catalog.json')).status,200);assert.equal((await fetch(base+'/missing')).status,404);assert.equal((await fetch(base,{method:'POST'})).status,405);assert.equal((await fetch(base+'/%2e%2e%2fpackage.json')).status,403);assert.equal((await fetch(base,{method:'HEAD'})).status,200);}finally{await new Promise(resolve=>s.close(resolve));}});
test('catalog mirrors source metadata',async()=>{for(const c of labs){const source=JSON.parse(await readFile(path.join(root,'challenges',c.id,'challenge.json'),'utf8'));assert.deepEqual(source.cases,c.cases);assert.equal(source.spec,c.spec);}});
test('CLI build and repair lifecycle protects source and records achievements',async()=>{
 const {cp}=await import('node:fs/promises'),{spawnSync}=await import('node:child_process');const temp=await mkdtemp(path.join(os.tmpdir(),'btw-cli-'));
 try{
  await cp(root,temp,{recursive:true,filter:p=>!['work','dist'].includes(path.relative(root,p).split(path.sep)[0])});
  const cli=(...args)=>spawnSync(process.execPath,['bin/btw.mjs',...args],{cwd:temp,encoding:'utf8'});
  assert.equal(cli('validate').status,0);assert.equal(cli('init','cpu').status,0);assert.equal(cli('init','cpu').status,1);
  assert.equal(cli('test','cpu').status,1);await cp(path.join(temp,'challenges/cpu/solution/solution.mjs'),path.join(temp,'work/cpu/solution.mjs'));
  assert.equal(cli('test','cpu').status,0);assert.equal(cli('badge','cpu').status,0);assert.match(await readFile(path.join(temp,'work/cpu-badge.svg'),'utf8'),/Build a tiny CPU/);
  assert.equal(cli('break','cpu').status,0);assert.equal(cli('test','cpu','--repair').status,1);
  await cp(path.join(temp,'challenges/cpu/solution/solution.mjs'),path.join(temp,'work/cpu-repair/solution.mjs'));assert.equal(cli('test','cpu','--repair').status,0);
  const progress=JSON.parse(await readFile(path.join(temp,'work/progress.json'),'utf8'));assert.equal(progress.cpu.build.passed,5);assert.equal(progress.cpu.repair.passed,5);
  assert.equal(cli('test','not-a-lab').status,1);assert.equal(cli('create','new-lab').status,0);assert.equal(cli('create','new-lab').status,1);
 }finally{await rm(temp,{recursive:true,force:true});}
});
