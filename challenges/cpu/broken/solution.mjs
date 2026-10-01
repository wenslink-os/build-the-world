export function run(p){let a=0,o=[];for(const [op,v] of p){if(op==='LOAD')a=v; if(op==='ADD')a+=v;if(op==='SUB')a-=v;if(op==='OUT')o.push(a);if(op==='HALT')break;}return o;}
