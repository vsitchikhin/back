const config = require('../config');
const mysql = require('mysql2/promise');
const newUser = require('../models/usersModel');
const bcrypt = require('bcrypt');

const salt = process.env.SALT


module.exports = async function createNewUser(request, response) {
  const connection = await mysql.createConnection(config);

  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });


  await request.on('end', async () => {
    body = JSON.parse(body);
    body.password = await bcrypt.hash(body.password, salt);

    newUser.constructor(body);
    const res = await newUser.createUser(connection).then();

    response.end(JSON.stringify(res));
  });
}
