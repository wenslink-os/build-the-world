import {cp,mkdir,rm} from 'node:fs/promises';
import path from 'node:path';
import {root} from '../engine/core.mjs';
const target=path.join(root,'dist');await rm(target,{recursive:true,force:true});await mkdir(target);await cp(path.join(root,'web'),target,{recursive:true});console.log('Static website copied to dist/. No bundler needed.');
