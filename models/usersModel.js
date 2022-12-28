const User = {
  name: '',
  surname: '',
  login: '',
  password: '',
  email: '',


  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.login = data.login;
    this.password = data.password;
    this.email = data.email;
  },

  async createUser(connection) {
    let errorMessage = 'OK';
    const isUserExists = await this.checkUserExists(connection);

    if (isUserExists) {
      errorMessage = 'Такой пользователь уже существует!'
      return {
        error: errorMessage.length > 0,
        errorMessage: errorMessage,
        payload: undefined
      };
    }

    await this.insertNewUser(connection);

    return {
      error: errorMessage.length > 0,
      errorMessage: errorMessage,
      payload: undefined
    };
  },

  async checkUserExists(connection) {
    const queryCheckUserExists = `SELECT count(*) AS users_count FROM users WHERE login = "${this.login}" OR email = "${this.email}"`;

    const [checkUserRows, checkUserFields] = await connection.execute(queryCheckUserExists);

    return !(checkUserRows[0].users_count === 0);
  },

  async insertNewUser(connection) {
    const queryInsertUser = `INSERT INTO users(name, surname, login, password, email)
                VALUES("${this.name}", "${this.surname}", "${this.login}", "${this.password}", "${this.email}");`;

    await connection.execute(queryInsertUser);
  },

  async deleteUser(connection, id) {
      const queryDeleteUser = `DELETE FROM users WHERE id=${id}`;

      await connection.execute(queryDeleteUser);

      return {
          error: false,
          errorMessage: 'OK',
          payload: undefined,
      }
  }
}

module.exports = User;
