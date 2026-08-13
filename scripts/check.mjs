import fs from 'node:fs'; import path from 'node:path';
const required=['index.html','assets/styles.css','assets/app.js','assets/domain.js','assets/vendor/xlsx.full.min.js','assets/vendor/chart.umd.min.js','.nojekyll'];
for(const p of required) if(!fs.existsSync(p)) throw new Error(`missing ${p}`);
const html=fs.readFileSync('index.html','utf8'); const ids=[...html.matchAll(/\bid=["']([^"']+)/g)].map(m=>m[1]);
const dup=ids.filter((x,i)=>ids.indexOf(x)!==i); if(dup.length) throw new Error(`duplicate ids: ${dup}`);
const forbidden=[/Sample Employee/i,/Natthanan/i,/loadSampleData/,/demoOverlay/,/Full version พร้อม/i,/Bundle Package/i];
for(const p of ['index.html','assets/app.js']) {const s=fs.readFileSync(p,'utf8'); for(const r of forbidden) if(r.test(s)) throw new Error(`${p}: forbidden ${r}`);}
console.log(`Static check passed: ${required.length} runtime files, ${ids.length} unique IDs, zero demo data/gates`);
