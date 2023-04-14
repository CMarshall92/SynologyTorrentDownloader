const { generateHash } = require('./hashing');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a password: ', (answer) => {
  console.log(`Your hashed password: ${generateHash(answer)}`)
  rl.close();
});
