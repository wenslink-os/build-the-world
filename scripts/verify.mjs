import {spawnSync} from 'node:child_process';
import {root} from '../engine/core.mjs';
for(const args of [['bin/btw.mjs','validate'],['--test','tests/platform.test.mjs']]){const r=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);}
