const logger = require('../../utlis/logger');
const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async CreateUser({ uid, name, email, encryptedPassword }) {
    try {
      const oldUser = await this.FindUser({ email });
      if (oldUser) {
        logger.info("User Already Exist. Please Login");
        throw new Error("User Already Exist. Please Login");
      }

      const user = new UserModel({
        uid:uid,
        email:email,
        password:encryptedPassword,
        name:name,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      logger.info(`Unable to create user: ${err}`);
      throw new Error("Unable to Create User");
    }
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async FindUser({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      return existingUser;
    } catch (err) {
      logger.info(`Unable to find user: ${err}`);
      throw new Error("Unable to Find User");
    }
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async FindUserById(uid) {
    try {
      const existingUser = await UserModel.findOne({uid: uid});
      return existingUser;
    } catch (err) {
      logger.info(`Unable to find user: ${err}`);
      throw new Error("Unable to Find User");
    }
  }

  /**
 * 
 * @param {*} param0 
 * @returns 
 */
  async FindAllUser() {
    try {
      const existingUser = await UserModel.find();
      return existingUser;
    } catch (err) {
      logger.info(`Unable to find user: ${err}`);
      throw new Error("Unable to Find User");
    }
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async DeleteUserById({ id }) {
    try {
      const deletedUser = await UserModel.deleteOne({ _id: id });
      return deletedUser;
    } catch (err) {
      logger.info(`Unable to delete user: ${err}`);
      throw new Error("Unable to Delete The User");
    }
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async UpdateUser({ user_id, name, email, status }) {
    const filter = user_id ? { _id: user_id } : {};

    try {
      let tupdate = await UserModel.findOneAndUpdate(
        filter,
        {
          name: name,
          email: email,
          status: status,
        },
        {}
      );
      return tupdate;
    } catch (err) {
      logger.info(`Unable to update user: ${err}`);
      throw new Error("Unable to Update The User");
    }
  }
}

module.exports = UserRepository;
