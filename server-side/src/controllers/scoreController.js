const fs = require("fs");
const path = require("path");
//convert callback to promise
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const base_URL = path.resolve(__dirname, "..");
const getWords = async (req, res, next) => {
  let checkFeature = [];
  (words = []), (result = []);

  const dataFromJson = await readFileAsync(
    base_URL + "/json/TestData.json",
    "utf8"
  );

  const parseData = JSON.parse(dataFromJson);

  const wordList = parseData.wordList.sort((firstParam, secandParam) =>
  //return array random
    Math.random() > 0.5 ? 1 : -1
  );

  wordList.forEach((word) => {
    // (!checkFeature[word.pos]) ?( result.push(word) checkFeature[word.pos] = true):(words.push(word))

    if (!checkFeature[word.pos]) {
      result.push(word);
      checkFeature[word.pos] = true;
    } else {
      words.push(word);
    }
  });

  //return result dynamic not static
  result = [...result, ...words.slice(0, 10 - result.length)];

  res.json(result);
  //    console.log(result);
};

const resultRank = async (req, res, next) => {
  result = 0;

  const { score } = req.body;
  const { scoresList } = JSON.parse(
    await readFileAsync(base_URL + "/json/TestData.json", "utf8")
  );

  scoresList.sort((firstParam, secandParam) => firstParam - secandParam);
  scoresList.find((ele, index) => {
    if (ele >= score) {
      return (result = (100 * index + 1) / 30);
    }
    result = ele;
  });
  //take 2 nummber after ,
  res.json(result.toFixed(2));
  //   console.log(result);
};
module.exports = {
  getWords,
  resultRank,
};
