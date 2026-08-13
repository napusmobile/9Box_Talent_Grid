import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {chromium} from 'playwright-core';

const root=process.cwd(), port=4189, base=`http://127.0.0.1:${port}`;
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1'],{cwd:root,stdio:'ignore'});
const wait=async()=>{for(let i=0;i<40;i++){try{if((await fetch(base)).ok)return;}catch{}await new Promise(r=>setTimeout(r,150));}throw new Error('server not ready');};
const fillPerson=async(page,{code,name,position='QA',department='Technology',performance='H',potential='H'})=>{
 await page.locator('input[name="EmpCode"]').fill(code); await page.locator('input[name="Name"]').fill(name);
 await page.locator('input[name="Position"]').fill(position); await page.locator('input[name="Department"]').fill(department);
 await page.locator('select[name="Performance"]').selectOption(performance); await page.locator('select[name="Potential"]').selectOption(potential);
};
try{
 await wait();
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 for(const cfg of [{name:'desktop',viewport:{width:1440,height:1000}},{name:'mobile',viewport:{width:390,height:844}}]){
  const page=await browser.newPage({viewport:cfg.viewport,acceptDownloads:true}); const errors=[];
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())}); page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'networkidle'});
  if(await page.locator('#dashboard').isVisible())throw new Error(`${cfg.name}: seeded data visible`);
  await fillPerson(page,{code:'QA-001',name:'ผู้ทดสอบระบบ'}); await page.locator('#employeeForm button[type=submit]').click(); await page.waitForTimeout(150);
  if((await page.locator('#kpiTotal').textContent())!=='1'||(await page.locator('#kpiLeaders').textContent())!=='1')throw new Error(`${cfg.name}: add/calculation failed`);
  const edit=cfg.name==='mobile'?page.locator('#mobileCards .row-actions button').first():page.locator('#employeeBody .row-actions button').first(); await edit.click();
  await page.locator('select[name="Performance"]').selectOption('M'); await page.locator('#employeeForm button[type=submit]').click(); await page.waitForTimeout(150);
  if((await page.locator('#kpiLeaders').textContent())!=='0')throw new Error(`${cfg.name}: edit/recalculation failed`);
  const downloadPromise=page.waitForEvent('download'); await page.locator('#exportExcel').click(); const download=await downloadPromise;
  if(!download.suggestedFilename().endsWith('.xlsx'))throw new Error(`${cfg.name}: export filename invalid`);
  if((await page.locator('body').evaluate(el=>el.scrollWidth>el.clientWidth)))throw new Error(`${cfg.name}: page overflow`);
  await page.screenshot({path:`docs/${cfg.name}-full.png`,fullPage:true});
  if(errors.length)throw new Error(`${cfg.name}: ${errors.join('; ')}`);
  console.log(`${cfg.name}: blank, add, edit, recalculate, export, responsive, console PASS`); await page.close();
 }
 const page=await browser.newPage({acceptDownloads:true}); const csv=path.join(os.tmpdir(),'9box-import-qa.csv');
 fs.writeFileSync(csv,'EmpCode,Name,Position,Department,Performance,Potential\nIMP-001,Import QA,Analyst,People,H,H\nIMP-002,,Analyst,People,M,M\n');
 await page.goto(base,{waitUntil:'networkidle'}); await page.locator('#fileInput').setInputFiles(csv); await page.waitForTimeout(250);
 if((await page.locator('#kpiTotal').textContent())!=='1')throw new Error('import: accepted count incorrect');
 if(!await page.locator('#validationPanel').isVisible())throw new Error('import: validation report missing');
 if(!/ไม่ผ่าน 1 แถว/.test(await page.locator('#status').textContent()))throw new Error('import: rejected count missing');
 const del=page.locator('#employeeBody .row-actions button').nth(1); await del.click();
 if(await page.locator('#dashboard').isVisible())throw new Error('delete: dashboard did not return to empty state');
 console.log('import: CSV accepted/rejected report and delete-to-empty PASS'); await page.close();
 await browser.close();
}finally{server.kill('SIGTERM');}
