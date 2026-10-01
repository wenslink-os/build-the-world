export function compile(s){const ns=s.split('+').map(Number),c=[['PUSH',ns[0]]];for(const n of ns.slice(1))c.push(['PUSH',n],['ADD']);return c;}
