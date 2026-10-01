import {runCases} from './harness.mjs';
self.onmessage=async({data})=>{
 let url;
 try{url=URL.createObjectURL(new Blob([data.code],{type:'text/javascript'}));const implementation=await import(url);self.postMessage(await runCases(data.challenge,implementation));}
 catch(e){self.postMessage(data.challenge.cases.map(t=>({name:t.name,ok:false,error:e.message})));}
 finally{if(url)URL.revokeObjectURL(url);}
};
