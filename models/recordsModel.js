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

    async getRecords(id, connection) {
        let errorMessage = 'OK';
        const queryGetRecords = `SELECT * FROM records WHERE user_id = "${id}"`

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

        const queryCreateRecord = `INSERT INTO records(created_at, deleted_at, date, user_id, service_id)
                                    VALUES (${Date.now()}, ${record.date}, ${record.user_id}, ${record.service_id})`;

        const [createRecordRows, createRecordFields] = connection.execute(queryCreateRecord);

        return {
            error: false,
            errorMessage: errorMessage,
            payload: createRecordRows,
        }
    },

    async deleteRecord(record, connection) {
      let errorMessage = 'OK';

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

      const [deleteRecordRows, deleteRecordFields] = connection.execute(queryDeleteRecord);

      return {
          error: false,
          errorMessage: errorMessage,
          payload: deleteRecordRows,
      }

    },

    async checkIsRecordExists(record, connection) {
        const queryCheckRecordExists = `SELECT count(*) AS records FROM records WHERE user_id = "${record.user_id}" and "date" = "${record.date}" and service_id = "${record.service_id}"`;

        const [countRecordsRows, countRecordFields] = connection.execute(queryCheckRecordExists);

        return countRecordsRows[0].records > 0;
    }
}

module.exports = Records;
