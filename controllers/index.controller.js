const { postIndexStore } = require("../store/index.store");

module.exports = {
  getIndexController: async (req, res, next) => {
    try {
      res.render("index");
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  },

  postIndexController: async (req, res, next) => {
    try {
      const fileGotten = req.file.path;
      const { number } = req.body;

      const result = await postIndexStore(fileGotten, number)

      res.send(result);

    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  },
};
