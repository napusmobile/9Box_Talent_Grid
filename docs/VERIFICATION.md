# Verification

## Automated checks

- Static contract: runtime files present, unique IDs, no embedded demo records or sales/demo gates
- Domain tests: rating normalization, all 9 boxes, row validation, duplicate codes, summaries, filters
- Browser E2E Desktop 1440×1000
- Browser E2E Mobile 390×844
- Blank state → manual add → edit → recalculation → Excel export
- CSV import with accepted and rejected rows → validation report → delete back to empty state
- Console errors: 0
- Horizontal page overflow: 0
- Dependency vulnerabilities: 0

## Commands

```bash
npm run qa
npm run test:e2e
npm audit --audit-level=high
```

## Privacy boundary

This is a static GitHub Pages application. Employee data is processed in the browser. There is no application backend. Persistence is opt-in Local Storage only.
