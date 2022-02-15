// const dotenv = require("dotenv").config();

const fs = require("fs");
const xlsx = require("xlsx");

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

      const readFile = fs.readFileSync(fileGotten, "utf8");

      var regEx = /\w+/gim;
      var match = readFile.match(regEx);
      console.log(" match", match);

      const store = match.map((i) => i.toLowerCase());
      const sortedStore = store.sort();

      const wordCount = {};

      for (let word of sortedStore) {
        if (!Object.keys(wordCount).includes(word)) {
          wordCount[word] = 1;
        } else {
          wordCount[word] = wordCount[word] + 1;
        }
      }

      const sortedWordCount = Object.fromEntries(
        Object.entries(wordCount).sort(([, a], [, b]) => b - a)
      );

      const result = {};
      for (let i = 0; i < number; i++) {
        result[Object.keys(sortedWordCount)[i]] =
          sortedWordCount[Object.keys(sortedWordCount)[i]];
      }

      console.log("store: ", result);

      res.send({
        frequencies: result
      })

      // res.render("output", {
      //   results: result,
      //   number
      // });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  },
};
