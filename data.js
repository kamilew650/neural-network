const fs = require("fs");

function prepareData() {
  const dataJson = fs.readFileSync("./csvjson.json");
  return JSON.parse(dataJson);
}

module.exports = prepareData;
