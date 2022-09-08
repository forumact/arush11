const UserService = require('../services/user-services');

const uservice = new UserService();

const login_post = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body.params;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return false;
    }

    const data = await uservice.SignIn({ email, password });
    if (data) {
      res.status(200).send({
        token: data.token,
        name: data.name,
        user_id: data.user_id,
      });
      return false;
    }
    res.status(400).send("Invalid Username or Credentials");
  } catch (err) {
    console.error(err);
  }
}

const logout_api_get = async (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("name");
  res.clearCookie("user_id");
  res.redirect("/login");
}

const fetch_users_api_get = async (req, res) => {
  try {
    const data = await uservice.FetchUser({});
    res.status(200).send({
      data: data,
    });

  } catch (err) {

  }

}


const fetch_users_by_id_api_get = async (req, res) => {
  try {
    const { uid } = req.query;
    const data = await uservice.FetchUserById(uid);
    res.status(200).send({
      data: data,
    });

  } catch (err) {

  }

}


const people_update_api_post = async (req, res) => {
  try {
    const { user_id, name, email, status } = req.body.params;
    const data = await uservice.UpdateUserById({ user_id, name, email, status });
    res.status(200).send({
      data: data,
    });
  } catch (err) {

  }
}

const register_api_post = async (req, res) => {
  try {
    const { uid, name, email, password } = req.body.params;
    // console.log(uid, name, email, password);
    const data = await uservice.SignUp({ uid, name, email, password });
    res.status(200).send({
      data: data,
    });
  } catch (err) {

  }
}

const people_delete_api_post = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await uservice.DeleteUserById({ id });
    res.status(200).send({
      data: data,
    });
  } catch (err) {

  }
}

//export controller functions
module.exports = {
  login_post,
  logout_api_get,
  fetch_users_api_get,
  fetch_users_by_id_api_get,
  people_update_api_post,
  register_api_post,
  people_delete_api_post
}