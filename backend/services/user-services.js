const { UserRepository } = require('../database');
// const UserService = require('../services/customer-service');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {

  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn({ email, password }) {
    try {
      const user = await this.repository.FindUser({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          {
            user_id: user.uid,
            email: email,
            name: user.name,
            role: user.role,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "2d",
          }
        );
        user.token = token;
        return ({
          token: token,
          name: user.name,
          user_id: user.uid,
        });
      }
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async SignUp({ uid, name, email, password }) {
    try {
      console.log('ddddd',uid, name, email, password);
      let encryptedPassword = await bcrypt.hash(password, 10);
console.log('encryptedPassword', encryptedPassword)
      const user = await this.repository.CreateUser({ uid, name, email, encryptedPassword });
      return user;
    } catch (err) {

    }
  }

  async FetchUser() {
    try {
      const user = this.repository.FindAllUser();
      return user;
    } catch (err) {

    }
  }

  async FetchUserById(uid) {
    try {
      const user = this.repository.FindUserById(uid);
      return user;
    } catch (err) {

    }
  }

  async UpdateUserById({ user_id, name, email, status }) {
    try {
      const user = this.repository.UpdateUser({ user_id, name, email, status });
      return user;
    } catch (err) {

    }
  }


  async DeleteUserById({ id }) {
    try {
      const user = this.repository.DeleteUserById({ id });
      return user;
    } catch (err) {

    }
  }

}


module.exports = UserService;