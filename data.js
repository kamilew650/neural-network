const fs = require('fs')


async function prepareData() {
    const dataJson = fs.readFileSync('./csvjson.json')
    return JSON.parse(dataJson)
}

module.exports = prepareData