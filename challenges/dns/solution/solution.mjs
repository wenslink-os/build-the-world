export function createDNS(now) {
 const cache=new Map();const normalize=n=>n.toLowerCase().replace(/\.$/,'');
 return {
  put(name,ip,ttl){if(ttl<0)throw new Error('Negative TTL');cache.set(normalize(name),{ip,until:now()+ttl});},
  resolve(name){const key=normalize(name),item=cache.get(key);if(!item)return null;if(now()>=item.until){cache.delete(key);return null;}return item.ip;}
 };
}
