const bcrypt = require('bcrypt');
let salt;

async function createSalt() {
  console.log(await bcrypt.genSalt(10));
}

salt = createSalt().then()

module.exports = salt
