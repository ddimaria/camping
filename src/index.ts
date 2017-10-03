import { Camping } from './camping';

declare var require: (filename: string) => any;
declare var process: any;

const fs = require('fs');
const file = process.argv[2];
const contents = fs.readFileSync(file, 'utf8');
const available = Camping.available(JSON.parse(contents));

console.info(available);

export { Camping };
