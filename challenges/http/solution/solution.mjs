export function parseRequest(raw) {
 const end=raw.indexOf('\r\n\r\n');if(end<0)throw new Error('Incomplete headers');
 const lines=raw.slice(0,end).split('\r\n'),match=/^([A-Z]+) (\S+) HTTP\/1\.1$/.exec(lines.shift());
 if(!match)throw new Error('Invalid request line');const headers={};
 for(const line of lines){const i=line.indexOf(':');if(i<=0)throw new Error('Invalid header');const key=line.slice(0,i).trim().toLowerCase();if(Object.hasOwn(headers,key))throw new Error('Duplicate header');Object.defineProperty(headers,key,{value:line.slice(i+1).trim(),enumerable:true});}
 return {method:match[1],path:match[2],headers};
}
