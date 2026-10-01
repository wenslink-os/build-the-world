export function createStore(hash){const m=new Map();return {commit(f){const id=hash(JSON.stringify(f));m.set(id,f);return id;},checkout(id){if(!m.has(id))throw Error();return m.get(id);}};}
