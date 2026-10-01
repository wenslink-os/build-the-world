export function execute(program) {
 const stack=[];
 for(const [op,n] of program) {
  if(op==='PUSH') stack.push(n);
  else if(op==='ADD'||op==='MUL') {
   if(stack.length<2) throw new Error('Stack underflow');
   const b=stack.pop(),a=stack.pop(); stack.push(op==='ADD'?a+b:a*b);
  } else if(op==='DUP') {if(!stack.length)throw new Error('Stack underflow');stack.push(stack.at(-1));}
  else throw new Error('Unknown instruction');
 }
 return stack;
}
