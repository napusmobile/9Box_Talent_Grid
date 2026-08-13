# Prototype source audit

Reference only: `ptha765/demo_9Box_grid`

## สิ่งที่พบในต้นแบบ

- Static single-file application (`index.html`) ประมาณ 1,053 บรรทัด
- มีข้อมูลบุคคลตัวอย่างฝังใน JavaScript 28 ราย
- Template มีข้อมูลพนักงานตัวอย่าง
- มีปุ่ม Sample Data, DEMO badge, sales modal, pricing/bundle และ `mailto:`
- Import ทิ้งแถวผิดรูปแบบโดยไม่มีรายงานที่ชัดเจน
- ตารางใช้ HTML string rendering กับข้อมูลที่ผู้ใช้อัปโหลด
- ไม่มี manual add/edit/delete, persistence opt-in, clear-data confirmation หรือ print report
- Runtime dependencies โหลดจาก CDN

## Full Version treatment

- ไม่คัดลอกข้อมูลบุคคลหรือ sales/demo gates
- เริ่มต้นด้วย empty state และ template เฉพาะหัวตาราง
- แยก domain calculation/validation ออกจาก UI
- ใช้ DOM `textContent` สำหรับข้อมูลพนักงาน
- เพิ่ม row-level validation, duplicate detection และ deterministic 9-box calculation
- เพิ่ม manual CRUD, filters, export, print/PDF, optional local persistence และ explicit clear-data flow
- Vendor runtime dependencies locally เพื่อไม่พึ่ง CDN

ต้นแบบใช้เพื่อศึกษา workflow เท่านั้น Repository ต้นทางไม่ได้ถูกแก้ไข
