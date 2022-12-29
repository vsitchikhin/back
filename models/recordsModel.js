const Records = {
    id: 0,
    createdAt: '',
    deletedAt: '',
    date: '',
    userId: 0,
    serviceId: 0,

    constructor(data) {
        this.id = data.id;
        this.createdAt = data.created_at;
        this.deletedAt = data.deleted_at;
        this.date = data.date;
        this.userId = data.user_id;
        this.serviceId = data.service_id;
    },

    async getRecords(body, connection) {
        let errorMessage = 'OK';
        const queryGetRecords = `SELECT *, records.id as id, services.name as service_name, staff.name as master_name, services.price as price
                                 FROM records
                                 JOIN services on services.id=records.service_id
                                 JOIN staff on staff.id=services.staff_id
                                 WHERE user_id = ${body.user_id}`

        const [recordsRows, recordsFields] = await connection.execute(queryGetRecords);

        return {
            error: false,
            errorMessage: errorMessage,
            payload: recordsRows,
        };
    },

    async createRecord(record, connection) {
        let errorMessage = 'OK';

        const isRecordExists = await this.checkIsRecordExists(record, connection);

        if (isRecordExists) {
            errorMessage = 'Такая запись у Вас уже существует!';
            return {
                error: true,
                errorMessage: errorMessage,
                payload: undefined,
            }
        }

        record.date = record.date.toString().split('T')[0]

        let date = new Date();
        date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()

        date = String(date).split('T')[0]

        const queryCreateRecord = `INSERT INTO records(created_at, deleted_at, date, user_id, service_id)
                                    VALUES ("${date}", "${record.date}", "${record.date}", "${record.id}", "${record.user_id}")`;

        const [createRecordRows, createRecordFields] = await connection.execute(queryCreateRecord);

        return {
            error: false,
            errorMessage: errorMessage,
            payload: createRecordRows,
        }
    },

    async deleteRecord(record, connection) {
      let errorMessage = 'OK';
      console.log(record)
        console.log(record.id);

      const queryDeleteRecord = `DELETE FROM records WHERE id = ${record.id}`
      const isRecordExists = await this.checkIsRecordExists(record, connection);

      if (!isRecordExists) {
          errorMessage = 'Такой записи не существует!';

          return {
              error: true,
              errorMessage: errorMessage,
              payload: undefined,
          }
      }

      const date = Date.now()

      if (date >= record.date) {
          errorMessage = 'Удалять записи можно не позже, чем за день';

          return {
              error: true,
              errorMessage: errorMessage,
              payload: undefined,
          }
      }

      await connection.execute(queryDeleteRecord);

      return {
          error: false,
          errorMessage: errorMessage,
          payload: undefined,
      }

    },

    async checkIsRecordExists(record, connection) {
        const queryCheckRecordExists = `SELECT count(*) AS records FROM records WHERE id = "${record.id}"`;

        const [countRecordsRows, countRecordFields] = await connection.execute(queryCheckRecordExists);

        return countRecordsRows[0].records > 0;
    }
}

module.exports = Records;
