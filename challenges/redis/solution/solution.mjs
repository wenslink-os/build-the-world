export function createKV(now) {
 const items=new Map();
 return {
  set(key,value,ttl=null){if(ttl!==null&&ttl<0)throw new Error('Negative TTL');items.set(key,{value,expires:ttl===null?null:now()+ttl});},
  get(key){const item=items.get(key);if(!item)return null;if(item.expires!==null&&now()>=item.expires){items.delete(key);return null;}return item.value;},
  delete(key){return items.delete(key);}
 };
}
