import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeRating,calculateBox,validateAndNormalizeRows,summarize,filterEmployees} from '../assets/domain.js';

test('normalizes Thai English and numeric ratings',()=>{
 assert.equal(normalizeRating('สูง'),'H'); assert.equal(normalizeRating('medium'),'M'); assert.equal(normalizeRating(1),'L');
});
test('calculates all nine boxes deterministically',()=>{
 const expected={LL:1,ML:2,HL:3,LM:4,MM:5,HM:6,LH:7,MH:8,HH:9};
 for(const [key,box] of Object.entries(expected)) assert.equal(calculateBox(key[0],key[1]),box,key);
});
test('returns accepted rows and explicit row-level errors without silently dropping invalid data',()=>{
 const result=validateAndNormalizeRows([
  {EmpCode:'E1',Name:' A ',Position:'P',Department:'D',Performance:'H',Potential:'M'},
  {EmpCode:'E2',Name:'',Performance:'H',Potential:'H'},
  {EmpCode:'E3',Name:'C',Performance:'X',Potential:'L'}]);
 assert.equal(result.accepted.length,1); assert.equal(result.errors.length,2); assert.equal(result.accepted[0].box,6);
});
test('duplicate employee codes are rejected case-insensitively',()=>{
 const r=validateAndNormalizeRows([{EmpCode:'A1',Name:'One',Performance:'M',Potential:'M'},{EmpCode:'a1',Name:'Two',Performance:'H',Potential:'H'}]);
 assert.equal(r.accepted.length,1); assert.match(r.errors[0].message,/ซ้ำ|duplicate/i);
});
test('summaries total to the accepted row count',()=>{
 const rows=[{box:9,Department:'A'},{box:9,Department:'B'},{box:1,Department:'A'}];
 const s=summarize(rows); assert.equal(s.total,3); assert.equal(s.byBox[9],2); assert.equal(Object.values(s.byBox).reduce((a,b)=>a+b,0),3);
});
test('filters by query box and department together',()=>{
 const rows=[{Name:'Anna',Position:'Dev',Department:'Tech',box:9},{Name:'Bob',Position:'Ops',Department:'Tech',box:5}];
 assert.deepEqual(filterEmployees(rows,{query:'ann',box:'9',department:'Tech'}).map(x=>x.Name),['Anna']);
});
