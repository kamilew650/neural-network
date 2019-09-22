const brain = require("brain.js");
const prepareData = require("./data");
var data;

prepareData().then(res => {
  data = res;

  var setLength = 800;
  const selectedData = data.slice(0, setLength); //data set for network training

  const controlData = data.slice(setLength - 10, setLength); //data set for final prediction
  const resultData = data.slice(setLength, setLength + 1);  //data for result verification

  var arrayData = [];

  const scaledData = selectedData.map(scaleDown); //scaling data down to values closer to 1
  const controlScaledData = controlData.map(scaleDown);

  for (let i = 1; i < setLength / 10; i++) {
    arrayData.push(scaledData.slice(i * 10, i * 10 + 10)); //creating a training set - array of arrays
  }

  //creating a neural network
  const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 4,
    hiddenLayers: [8],
    outputSize: 4,
  });

  net.train(arrayData, {
    errorThresh: 0.03, // the acceptable error percentage from training data --> number between 0 and 1
    log: (stats) => console.log(stats), // true to use console.log, when a function is supplied it is used --> Either true or a function
    learningRate: 0.005, // scales with delta to effect training rate --> number between 0 and 1
  });

  console.log("predicted:")
  var data2 = net.run(controlScaledData);
  console.log(scaleUp(data2)); //printing out the predicted values

  console.log("real:")
  console.log(resultData);  //printing data for comparison with predicted
});


function scaleDown(data) {
  return {
    Open: data.Open / 1000,
    High: data.High / 1000,
    Low: data.Low / 1000,
    Close: data.Close / 1000
  }
}

function scaleUp(data) {
  return {
    Open: data.Open * 1000,
    High: data.High * 1000,
    Low: data.Low * 1000,
    Close: data.Close * 1000
  }
}