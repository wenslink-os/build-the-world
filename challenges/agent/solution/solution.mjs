export async function runAgent(plan,tools,budget) {
 if(!Number.isInteger(budget)||budget<0)throw new Error('Invalid budget');
 if(plan.length>budget)throw new Error('Budget exceeded');const results=[];
 for(const step of plan){if(!Object.hasOwn(tools,step.tool)||typeof tools[step.tool]!=='function')throw new Error('Unknown tool');results.push(await tools[step.tool](step.input));}
 return results;
}
