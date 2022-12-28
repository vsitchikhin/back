const config = require('../config');
const mysql = require('mysql2/promise');
const model = require('../models/imagesModel');

module.exports = async function getMainPageImages(request, response) {
    const connection = await mysql.createConnection(config);

    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });

    await request.on('end', async () => {
        body = JSON.parse(body);

        model.constructor(body);
        const res = await model.getImages(connection).then();

        response.end(JSON.stringify(res));
    })
}
