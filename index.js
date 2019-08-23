const brain = require("brain.js");
const prepareData = require("./data");

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.003 // supported for activation type 'leaky-relu'
};

var data;

prepareData().then(res => {
  data = res;
  console.log(data.length);

  const selectedData = data.slice(0, 800);

  const controlData = data.slice(790, 800).map(obj => obj.High);
  const resultData = data.slice(800, 801).map(obj => obj.High);

  var arrayData = [];

  for (let i = 1; i < 80; i++) {
    let obj = { input: [], output: [] };
    for (let y = 0; y < 10; y++) {
      obj.input.push(selectedData[(i - 1) * 10 + y].High / 1000);
      if (y === 0) obj.output.push(selectedData[i * 10 + y].High / 1000);
    }
    arrayData.push(obj);
  }

  // console.log(arrayData)
  // // create a simple feed forward neural network with backpropagation
  const net = new brain.NeuralNetwork(config);

  net.train(arrayData, {
    iterations: 200000, // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.02, // the acceptable error percentage from training data --> number between 0 and 1
    log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 10, // iterations between logging out --> number greater than 0
    learningRate: 0.2, // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
    callback: null, // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: Infinity
  });

  const output = net.run(controlData).map(el => el * 1000); // [0.987]

  const fixedOutput = output.map(el => el.toFixed(2));
  console.log("My result: " + fixedOutput);
  console.log("Correct result:" + resultData);
});
