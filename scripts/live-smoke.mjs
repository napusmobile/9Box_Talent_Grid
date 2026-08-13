import {chromium} from 'playwright-core';
const url='https://napusmobile.github.io/9Box_Talent_Grid/';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
for(const cfg of [{name:'live-desktop',viewport:{width:1440,height:900}},{name:'live-mobile',viewport:{width:390,height:844}}]){
 const page=await browser.newPage({viewport:cfg.viewport}); const errors=[],failed=[];
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())}); page.on('pageerror',e=>errors.push(e.message)); page.on('requestfailed',r=>failed.push(`${r.url()} ${r.failure()?.errorText}`));
 const response=await page.goto(url,{waitUntil:'networkidle'}); if(response?.status()!==200)throw new Error(`${cfg.name}: HTTP ${response?.status()}`);
 if(await page.locator('#dashboard').isVisible())throw new Error(`${cfg.name}: live seeded state`);
 const title=await page.title(); if(title!=='9-Box Talent Grid — Full Version')throw new Error(`${cfg.name}: title mismatch`);
 if((await page.locator('body').evaluate(el=>el.scrollWidth>el.clientWidth)))throw new Error(`${cfg.name}: overflow`);
 if(errors.length||failed.length)throw new Error(`${cfg.name}: ${[...errors,...failed].join('; ')}`);
 console.log(`${cfg.name}: HTTP200, empty-state, assets, zero overflow/errors PASS`); await page.close();
}
await browser.close();
