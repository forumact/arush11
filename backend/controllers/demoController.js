const demo_get = async (req, res) => {
  res.send({
    status: 200,
    data: {"one": "one", "two": "two"},
  });
};


//export controller functions
module.exports = {
  demo_get,
};