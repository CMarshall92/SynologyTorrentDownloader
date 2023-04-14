const bcrypt = require('bcrypt');
const saltRounds = 10;

const generateHash = (plainTextPass) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plainTextPass, salt);
}

const verifyHash = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
}

module.exports.generateHash = generateHash;
module.exports.verifyHash = verifyHash;