const authorizatedUser = {
  login: '',
  password: '',

  constructor(data) {
    this.login = data.login;
    this.password = data.password;
  },

  async getUserByLogin(connection) {
    const queryGetUser = `SELECT * FROM users WHERE login = "${this.login}"`
    const [userRows, userFields] = await connection.execute(queryGetUser);
    if (userRows.length === 0) {
      return {
        error: true,
        errorMessage: 'Пользователя с таким login не существует!',
        payload: undefined,
      };
    }

    const isValidPassword = userRows[0].password === this.password;

    if (isValidPassword) {
      const session = await this.getSession(userRows[0].user_id, connection);
      return {
        error: false,
        errorMessage: 'OK',
        payload: session,
      };
    }
    return {
      error: true,
      errorMessage: 'Неверный пароль!',
      payload: undefined,
    }
  },

  async getSession(id, connection) {
    const queryGetSessionByUserId = `SELECT * FROM sessions WHERE user_id = ${id}`

    const isSessionExists = await this.checkSessionExists(id, connection);

    if (isSessionExists) {
      const [sessionRows, sessionFields] = await connection.execute(queryGetSessionByUserId);
      return sessionRows
    }

    await this.createSession(id, connection);
    const [sessionRows, sessionFields] = await connection.execute(queryGetSessionByUserId);
    return sessionRows[0]
  },

  async createSession(id, connection) {
    let currDate = new Date();
    currDate.setMonth(currDate.getMonth() + 1)
    currDate = currDate.toISOString().split('T')

    const date = currDate[0];
    let time = currDate[1];
    const deletedDate = currDate[0];
    deletedDate.setMonth(deletedDate.getMonth() + 1);
    time = time.slice(0, -5)
    const queryCreateSession = `INSERT INTO sessions(user_id, created_at, deleted_at)
                            VALUES(${id}, "${date + ' ' + time}", "${deletedDate + ' ' + time}")`;

    await connection.execute(queryCreateSession);
  },

  async checkSessionExists(id, connection) {
    const queryCheckSessionExists = `SELECT count(*) AS sessions FROM sessions WHERE user_id = ${id}`;
    const [checkSessionRows, checkSessionFields] = await connection.execute(queryCheckSessionExists);
    return checkSessionRows[0].sessions > 0
  }
}

module.exports = authorizatedUser
