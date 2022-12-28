const config = require('../config');
const mysql = require('mysql2/promise');
const model = require('../models/recordsModel');

const RecordsController = {
    async getRecords(request, response) {
        const connection = await mysql.createConnection(config);

        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });

        await request.on('end', async () => {
            body = JSON.parse(body);

            model.constructor(body);
            const res = await model.getRecords(body, connection).then();

            response.end(JSON.stringify(res));
        })
    },

    async createRecord(request, response) {
        const connection = await mysql.createConnection(config);

        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        })

        await request.on('end', async () => {
            body = JSON.parse(body);

            model.constructor(body);
            const res = await model.createRecord(body, connection).then();
            response.end(JSON.stringify(res));
        })
    },

    async deleteRecord(request, response) {
        const connection = await mysql.createConnection(config);

        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        })

        await request.on('end', async () => {
            body = JSON.parse(body);

            model.constructor(body);
            const res = await model.deleteRecord(body, connection).then();
            response.end(JSON.stringify(res));
        })
    }
}

module.exports = RecordsController;
