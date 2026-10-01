export async function runCases(c,implementation){
 const equal=(a,b)=>{if(JSON.stringify(a)!==JSON.stringify(b))throw Error('Expected '+JSON.stringify(b)+', received '+JSON.stringify(a));};
 const throws=fn=>{let threw=false;try{fn();}catch{threw=true;}if(!threw)throw Error('Expected an exception');};
 const rejects=async fn=>{let threw=false;try{await fn();}catch{threw=true;}if(!threw)throw Error('Expected a rejection');};
 const results=[];
 for(const test of c.cases){
  try{const fn=new Function(...c.exports,'equal','throws','rejects','return (async()=>{'+test.body+'})()');await fn(...c.exports.map(k=>implementation[k]),equal,throws,rejects);results.push({name:test.name,ok:true});}
  catch(e){results.push({name:test.name,ok:false,error:String(e.message||e)});}
 }
 return results;
}
