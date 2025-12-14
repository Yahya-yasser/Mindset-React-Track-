# ID-national-number

Small React + Vite app to parse Egyptian national ID numbers and display birth date, governorate, and gender.

## Quick start

`powershell
cd " d:\\React.js Training\\ID-national-number\\ID-national-number\ 
npm install
npm run dev
`

Open http://localhost:5174/ in your browser.

## Features
- Parse a 14-digit Egyptian national ID (supports some 16-digit variants)
- Extract birth date, governorate and gender
- Inline editing for parsed fields

## Notes
- The app performs basic check-digit validation (Luhn). If you prefer a different algorithm, update src/utils/idParser.js.
- To publish this repo, create a remote (GitHub/GitLab) and push the main branch.

