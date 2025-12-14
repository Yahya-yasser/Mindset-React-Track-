import { parseEgyptianNationalId } from '../src/utils/idParser.js';

const ids = [
  '30212211601096',
];

for (const id of ids) {
  console.log('ID:', id);
  console.log('Parsed:', parseEgyptianNationalId(id));
  console.log('---');
}
