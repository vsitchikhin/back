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
      return {
        error: false,
        errorMessage: 'OK',
        payload: userRows,
      };
    }
    return {
      error: true,
      errorMessage: 'Неверный пароль!',
      payload: undefined,
    }
  },
}

module.exports = authorizatedUser
