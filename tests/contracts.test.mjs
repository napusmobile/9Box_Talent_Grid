import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8'); const js=fs.readFileSync('assets/app.js','utf8'); const css=fs.readFileSync('assets/styles.css','utf8');
test('contains full product workflow surfaces',()=>{for(const id of ['workspace','emptyState','employeeForm','validationPanel','nineBoxGrid','dashboard','employeeTable','privacyNotice']) assert.match(html,new RegExp(`id=["']${id}["']`));});
test('contains no demo sample sales or embedded person data',()=>{const all=html+'\n'+js; for(const s of ['loadSampleData','demoOverlay','Sample Employee','Natthanan','Full version พร้อม','Bundle Package','ราคา Full Version']) assert.equal(all.includes(s),false,s);});
test('uses local vendor assets and no remote runtime dependencies',()=>{assert.equal(/https?:\/\//.test([...html.matchAll(/<(?:script|link)[^>]+(?:src|href)=["']([^"']+)/g)].map(m=>m[1]).join('')),false); assert.match(html,/assets\/vendor\/xlsx\.full\.min\.js/);});
test('template implementation is header-only',()=>{assert.match(js,/TEMPLATE_HEADERS/); assert.doesNotMatch(js,/EMP-00\d|Sample Employee/);});
test('accessible landmarks status and mobile navigation exist',()=>{assert.match(html,/<main/); assert.match(html,/aria-live=["']polite/); assert.match(html,/aria-label=/); assert.match(css,/@media\s*\(max-width:\s*760px\)/);});
test('safe rendering avoids imported data interpolation via innerHTML',()=>{assert.doesNotMatch(js,/innerHTML\s*=.*(?:Name|Department|Position|EmpCode)/);});
