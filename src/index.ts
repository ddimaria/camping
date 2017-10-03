declare var require: (filename: string) => any;
declare var process: any;

import { Camping } from './camping';

const fs = require('fs');
const file = process.argv[2];

// validate file existence
if (!fs.existsSync(file)) {
  console.error('File not found');
  process.exit(0);
}

const contents = fs.readFileSync(file, 'utf8');
const available = Camping.available(JSON.parse(contents));

// just output to the command line for this program
console.info(available);

export { Camping };
