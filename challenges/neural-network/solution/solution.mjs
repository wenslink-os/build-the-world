export function predict(weights,bias,input) {
 if(weights.length!==input.length)throw new Error('Dimension mismatch');
 return weights.reduce((sum,w,i)=>sum+w*input[i],bias)>=0?1:0;
}
export function train(weights,bias,input,target,rate) {
 const error=target-predict(weights,bias,input);
 return {weights:weights.map((w,i)=>w+rate*error*input[i]),bias:bias+rate*error};
}
