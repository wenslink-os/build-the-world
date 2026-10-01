export function compile(source) {
 if(!/^\s*\d+\s*(\+\s*\d+\s*)*$/.test(source)) throw new Error('Syntax error');
 const nums=source.split('+').map(x=>Number(x.trim()));
 const code=[['PUSH',nums[0]]];
 for(const n of nums.slice(1)) code.push(['PUSH',n],['ADD']);
 return code;
}
