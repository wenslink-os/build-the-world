export async function runAgent(plan,tools,budget){const r=[];for(const s of plan){if(typeof tools[s.tool]!=='function')throw Error();r.push(await tools[s.tool](s.input));}return r;}
