// Rewrites index.json from the packs on disk: node tools/index.mjs
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';

const languages = readdirSync('.')
  .filter((d) => /^[a-z]{2,3}(-[A-Z]{2})?$/.test(d) && statSync(d).isDirectory())
  .map((code) => {
    const file = `${code}/${code}.json`;
    const body = readFileSync(file);
    const pack = JSON.parse(body.toString('utf8'));
    return { code, name: pack.name, englishName: pack.englishName, file, bytes: body.length, sha256: createHash('sha256').update(body).digest('hex') };
  });
writeFileSync('index.json', `${JSON.stringify({ format: 1, languages }, null, 2)}\n`);
console.log(languages.map((l) => `${l.code} ${l.bytes}`).join('\n'));
