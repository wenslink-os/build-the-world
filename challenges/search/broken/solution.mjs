export function createIndex(ds){return {search(q){return ds.flatMap((d,i)=>d.toLowerCase().includes(q.toLowerCase())?[i]:[]);}};}
