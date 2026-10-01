const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {readFile} from 'node:fs/promises';
import {root} from '../engine/core.mjs';
import path from 'node:path';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173');await page.locator('.card').first().waitFor();
if(await page.locator('.card').count()!==10)throw Error('Missing labs');

await page.locator('.card button').first().click();await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#run').disabled===false);
if(!(await page.locator('#result').textContent()).includes('0/5 passed'))throw Error('Starter falsely passes');
const code=await readFile(path.join(root,'challenges/cpu/solution/solution.mjs'),'utf8');
await page.locator('#editor').fill(code);await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#run').disabled===false);
if(!(await page.locator('#result').textContent()).includes('5/5 passed'))throw Error('Browser reference failed');
await page.locator('#break').click();await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#run').disabled===false);
if((await page.locator('#result').textContent()).includes('5/5 passed'))throw Error('Broken code falsely passes');
await page.locator('#restore').click();if(await page.locator('#editor').inputValue()!==code)throw Error('Build workspace lost');
await page.reload();await page.locator('.card button').first().click();if(await page.locator('#editor').inputValue()!==code)throw Error('Progress not persistent');
await page.locator('#editor').fill('export function run(){while(true){}}');await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#result').textContent.includes('exceeded'),{},{timeout:6500});
await page.locator('#outages input[value="internet"]').check();if(!(await page.locator('#simulation').textContent()).includes('unavailable'))throw Error('Outage not simulated');
await page.setViewportSize({width:390,height:844});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile horizontal overflow');

await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);await page.context().setOffline(true);await page.reload();await page.locator('.card').first().waitFor();if(await page.locator('.card').count()!==10)throw Error('Offline assets missing');
if(errors.length)throw Error(errors.join('\n'));console.log('Browser QA passed: catalog, starter, reference, break, restore, persistence, timeout, simulator, mobile layout, offline reload.');await browser.close();
