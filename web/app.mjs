import {simulate} from './simulator.mjs';
const $=id=>document.getElementById(id);const catalog=await fetch('catalog.json').then(r=>r.json());
let state={},current=null,mode='build',hints=0,category='All',worker=null,timer=null;
try{state=JSON.parse(localStorage.getItem('btw-v1')||'{}');}catch{$('storage-status').textContent='Local storage is unavailable; use Export progress to save attempts.';}
function persist(){try{localStorage.setItem('btw-v1',JSON.stringify(state));}catch{$('storage-status').textContent='Local storage is full or unavailable. Export your work.';}}
function node(tag,text,cls){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;}
function saveCode(){if(current){state[current.id]??={};state[current.id][mode]??={};const attempt=state[current.id][mode];if(attempt.code!==$('editor').value){delete attempt.passed;delete attempt.total;delete attempt.at;}attempt.code=$('editor').value;persist();}}
function stop(){if(worker)worker.terminate();worker=null;clearTimeout(timer);$('run').disabled=false;}
function render(){const query=$('search').value.toLowerCase();$('cards').replaceChildren();for(const c of catalog.filter(c=>(category==='All'||c.category===category)&&(c.title+' '+c.description).toLowerCase().includes(query))){const card=node('article',undefined,'card');card.append(node('small',c.category),node('h3',c.title),node('p',c.description));const progress=state[c.id]?.build?.passed;card.append(node('small',progress===c.cases.length?'✓ Build tests passed':c.cases.length+' acceptance tests'));const b=node('button','Open lab ↗');b.onclick=()=>open(c);card.append(b);$('cards').append(card);}}
function open(c){stop();saveCode();current=c;mode='build';hints=0;$('workspace').hidden=false;$('lab-category').textContent=c.category;$('lab-title').textContent=c.title;$('api').textContent=c.api;$('spec').textContent=c.spec;$('hints').replaceChildren();$('failure').textContent='';$('result').replaceChildren();$('editor').value=state[c.id]?.build?.code||c.starter;$('workspace').scrollIntoView({behavior:'smooth'});}
for(const cat of ['All',...new Set(catalog.map(c=>c.category))]){const b=node('button',cat,cat==='All'?'selected':'');b.onclick=()=>{category=cat;for(const el of $('filters').children)el.classList.toggle('selected',el===b);render();};$('filters').append(b);}
for(const c of catalog){const b=node('button',c.title);b.append(node('small',c.prerequisites.length?'After: '+c.prerequisites.join(' + '):'Start here'));b.onclick=()=>open(c);$('world-map').append(b);}
$('search').oninput=render;$('editor').oninput=saveCode;
$('editor').onkeydown=e=>{if(e.key==='Tab'){e.preventDefault();const t=e.target,s=t.selectionStart,end=t.selectionEnd;t.setRangeText('  ',s,end,'end');saveCode();}};
$('hint').onclick=()=>{if(hints<current.hints.length)$('hints').append(node('li',current.hints[hints++]));};
$('close').onclick=()=>{stop();saveCode();$('workspace').hidden=true;};
$('break').onclick=()=>{stop();saveCode();mode='repair';$('editor').value=state[current.id]?.repair?.code||current.broken;$('failure').textContent='Failure injected: '+current.scenario+'. Repair the implementation and run the same tests.';$('result').replaceChildren();saveCode();};
$('restore').onclick=()=>{stop();saveCode();mode='build';$('editor').value=state[current.id]?.build?.code||current.starter;$('failure').textContent='Build workspace restored.';$('result').replaceChildren();};
$('reset').onclick=()=>{if(!confirm('Replace the current code with its original starter?'))return;stop();$('editor').value=mode==='repair'?current.broken:current.starter;saveCode();};
$('run').onclick=()=>{
 stop();saveCode();$('run').disabled=true;$('result').textContent='Running acceptance tests…';const started=performance.now(),c=current,m=mode;
 worker=new Worker('worker.mjs',{type:'module'});timer=setTimeout(()=>{stop();$('result').textContent='Execution exceeded 4 seconds. Check for an infinite loop.';},4000);
 worker.onmessage=({data})=>{stop();const passed=data.filter(t=>t.ok).length;$('result').replaceChildren(node('p',`${passed}/${data.length} passed in ${(performance.now()-started).toFixed(1)} ms (worker startup included).`));for(const t of data)$('result').append(node('div',(t.ok?'PASS ':'FAIL ')+t.name+(t.error?': '+t.error:''),t.ok?'pass':'fail'));state[c.id][m].passed=passed;state[c.id][m].total=data.length;state[c.id][m].at=new Date().toISOString();persist();render();};
 worker.onerror=e=>{stop();$('result').textContent='Worker error: '+e.message;};worker.postMessage({challenge:c,code:$('editor').value});
};
function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type})),a=node('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('download').onclick=()=>download(current.id+'-'+mode+'.mjs',$('editor').value,'text/javascript');$('export').onclick=()=>{saveCode();download('btw-progress.json',JSON.stringify(state,null,2),'application/json');};
for(const name of ['internet','dns','auth','payments','database']){const label=node('label'),i=node('input');i.type='checkbox';i.value=name;i.onchange=updateSimulation;label.append(i,document.createTextNode(' '+name));$('outages').append(label);}
for(const id of ['cache','localLogin','queue'])$(id).onchange=updateSimulation;
function updateSimulation(){const failures=[...$('outages').querySelectorAll('input:checked')].map(x=>x.value);const outcomes=simulate(failures,Object.fromEntries(['cache','localLogin','queue'].map(id=>[id,$(id).checked])));$('simulation').replaceChildren();for(const o of outcomes){const d=node('div',undefined,'outcome '+o.state);d.append(node('span',o.state),node('strong',o.feature),node('p',o.reason));$('simulation').append(d);}}
render();updateSimulation();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.mjs').catch(()=>{});
