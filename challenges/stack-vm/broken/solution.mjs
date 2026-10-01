export function execute(p){const s=[];for(const [op,n] of p){if(op==='PUSH')s.push(n);else if(op==='DUP')s.push(s.at(-1));else {let b=s.pop(),a=s.pop();s.push(op==='ADD'?a+b:a*b);}}return s;}
