export function createStore(hash) {
 const objects=new Map();
 return {
  commit(files){const entries=Object.keys(files).sort().map(k=>[k,files[k]]);const encoded=JSON.stringify(entries),id=hash(encoded);objects.set(id,encoded);return id;},
  checkout(id){if(!objects.has(id))throw new Error('Unknown snapshot');return Object.fromEntries(JSON.parse(objects.get(id)));}
 };
}
