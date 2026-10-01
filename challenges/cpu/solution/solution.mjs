export function run(program) {
 let a=0; const out=[];
 for(const [op,value] of program) {
  if(op==='LOAD') a=value & 255;
  else if(op==='ADD') a=(a+value)&255;
  else if(op==='SUB') a=(a-value)&255;
  else if(op==='OUT') out.push(a);
  else if(op==='HALT') break;
  else throw new Error('Unknown instruction');
 }
 return out;
}
