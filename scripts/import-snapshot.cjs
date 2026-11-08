'use strict';
// Import data only: never replace the editable UI or overwrite existing data.
const fs = require('node:fs');
const path = require('node:path');
const source = process.argv[2];
if (!source) throw Error('사용법: npm run import -- "스냅샷.html"');
const html = fs.readFileSync(source, 'utf8');
const match = html.match(/<script id="snapshot-data" type="application\/json">([\s\S]*?)<\/script>/);
if (!match) throw Error('snapshot-data가 없는 파일입니다.');
const data = JSON.parse(match[1]);
if (!Array.isArray(data.items) || !data.catalog || !data.state || !Array.isArray(data.fields) || !Array.isArray(data.types)) throw Error('지원하지 않는 스냅샷 구조입니다.');
const folder = path.join(__dirname, '..', 'data');
fs.mkdirSync(folder, {recursive:true});
fs.writeFileSync(path.join(folder, 'snapshot.json'), match[1], {flag:'wx'});
console.log(`${data.items.length}개 항목 가져오기 완료. 기존 브라우저 편집 내용은 자동 병합되지 않습니다.`);
