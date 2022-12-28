const config = require('../config');
const mysql = require('mysql2/promise');
const deleteUsers = require('../models/usersModel');

module.exports = async function deleteUser(request, response) {
    const connection = await mysql.createConnection(config);

    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    })

    await request.on('end', async () => {
        body = JSON.parse(body);

        deleteUsers.constructor(body);
        const res = await deleteUsers.deleteUser(connection, body.id).then();

        response.end(JSON.stringify(res));
    })
}
