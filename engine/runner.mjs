import {parentPort,workerData} from 'node:worker_threads';
import {pathToFileURL} from 'node:url';
import {runCases} from './harness.mjs';
try{const implementation=await import(pathToFileURL(workerData.file));parentPort.postMessage(await runCases(workerData.challenge,implementation));}
catch(e){parentPort.postMessage(workerData.challenge.cases.map(t=>({name:t.name,ok:false,error:e.message})));}
