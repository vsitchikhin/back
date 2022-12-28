const config = require('../config');
const mysql = require('mysql2/promise');
const model = require('../models/servicesModel');

const ServicesController = {
    async getShortServices(request, response) {
        const connection = await mysql.createConnection(config);

        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        })

        await request.on('end', async () => {
            body = JSON.parse(body);

            model.constructor(body);
            const res = await model.getShortService(body, connection).then();

            response.end(JSON.stringify(res));
        })
    },

    async getFullServices(request, response, id) {
        const connection = await mysql.createConnection(config);

        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        })

        await request.on('end', async () => {
            body = JSON.parse(body);

            model.constructor(body);
            const res = await model.getFullService(id, connection).then();

            response.end(JSON.stringify(res));
        })
    }
}

module.exports = ServicesController;
