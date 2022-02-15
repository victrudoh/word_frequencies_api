const { postIndexStore } = require("../store/index.store");

const path = require("path");

describe("Word frequency function", () => {
  test("it should return the top N most frequent words matching a text file", () => {
    const fileGotten = path.join(__dirname, "..", "__data__", "index.txt");

    const N = 3;

    const output = {
      frequencies: [
        { word: "sed", count: 12 },
        { word: "id", count: 10 },
        { word: "amet", count: 8 },
      ],
    };

    expect(postIndexStore(fileGotten, N)).toEqual(output);
  });
});
