# 9-Box Talent Grid — Full Version

เว็บแอปแบบ Local-first สำหรับ Talent Calibration ด้วย Performance × Potential

## ความสามารถ

- เริ่มต้นด้วยข้อมูลว่าง ไม่มีรายชื่อพนักงานตัวอย่าง
- นำเข้า `.xlsx`, `.xls`, `.csv`
- Validation รายแถวและตรวจรหัสพนักงานซ้ำ
- เพิ่ม แก้ไข และลบพนักงานด้วยตนเอง
- คำนวณ 9-Box, KPI, Distribution และคำแนะนำราย Box
- ค้นหาและกรองตาม Box/แผนก
- Export Excel พร้อม Employee Detail และ Executive Summary
- Print/PDF ผ่าน Browser
- เลือกเก็บข้อมูลใน Local Storage ได้
- Dependencies อยู่ใน Repository ใช้งานได้โดยไม่พึ่ง CDN

## Privacy

ข้อมูลพนักงานประมวลผลใน Browser เท่านั้น ไม่มี Backend และไม่มีการส่งข้อมูลไปภายนอก การเก็บใน Local Storage จะเกิดขึ้นเมื่อผู้ใช้เปิดตัวเลือก “จำข้อมูลในเครื่องนี้” เท่านั้น

## การทดสอบ

```bash
npm install --ignore-scripts
npm run qa
npm run test:e2e
npm audit --audit-level=high
```

## Deploy

Static site พร้อม GitHub Pages จาก branch `main` และ root `/` (`.nojekyll` included)

## หมายเหตุการใช้งาน

9-Box เป็นเครื่องมือสนับสนุน Talent Calibration ไม่ควรใช้ตัดสินพนักงานอัตโนมัติ ผลลัพธ์ควรผ่านการทบทวนโดยผู้รับผิดชอบและคณะกรรมการที่เกี่ยวข้อง
