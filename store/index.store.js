// const dotenv = require("dotenv").config();

const fs = require("fs");

module.exports = {
  postIndexStore: async (fileGotten, number) => {
    const readFile = fs.readFileSync(fileGotten, "utf8");

    const regEx = /\w+/gim;
    const match = readFile.match(regEx);

    const store = match.map((i) => i.toLowerCase()).sort();
    const wordCount = {};

    for (let word of store) {
      if (!Object.keys(wordCount).includes(word)) {
        wordCount[word] = 1;
      } else {
        wordCount[word] = wordCount[word] + 1;
      }
    }

    const sortedWordCount = Object.fromEntries(
      Object.entries(wordCount).sort(([, a], [, b]) => b - a)
    );

    const result = [];
    for (let i = 0; i < number; i++) {
      result.push({
        word: Object.keys(sortedWordCount)[i],
        count: sortedWordCount[Object.keys(sortedWordCount)[i]],
      });
    }

    console.log("store: ", result);

    return {
      frequencies: result,
    };
  },
};
