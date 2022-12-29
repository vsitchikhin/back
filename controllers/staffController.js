const config = require('../config');
const mysql = require('mysql2/promise');
const model = require('../models/staffModel');

module.exports = async function getStaff(request, response) {
    const connection = await mysql.createConnection(config);
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    })

    await request.on('end', async () => {
        const res = await model.getStaff(connection).then();

        response.end(JSON.stringify(res));
    })
}
