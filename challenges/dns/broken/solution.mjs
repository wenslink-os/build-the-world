export function createDNS(now){const m=new Map();return {put(n,ip,ttl){if(ttl<0)throw Error();m.set(n,{ip,e:now()+ttl});},resolve(n){const x=m.get(n);return x&&now()<x.e?x.ip:null;}};}
