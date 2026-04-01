import bcrypt from 'bcryptjs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const plain = await rl.question('New admin password: ');
rl.close();
if (!plain || plain.length < 8) {
  console.error('Use at least 8 characters.');
  process.exit(1);
}
console.log('\nAdd this to .env.local as ADMIN_PASSWORD_BCRYPT:\n');
console.log(bcrypt.hashSync(plain, 12));
