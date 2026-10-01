export function createIndex(documents) {
 const tokenize=s=>s.toLowerCase().match(/[a-z0-9]+/g)||[];const index=new Map();
 documents.forEach((doc,id)=>{for(const word of new Set(tokenize(doc))){if(!index.has(word))index.set(word,new Set());index.get(word).add(id);}});
 return {search(query){const terms=tokenize(query);if(!terms.length)return [];let ids=[...(index.get(terms[0])||[])];for(const term of terms.slice(1))ids=ids.filter(id=>index.get(term)?.has(id));return ids.sort((a,b)=>a-b);}};
}
