// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


document.getElementById('button').addEventListener('click', () => {
    document.getElementById("header").innerHTML = "Calcuation in progress";
    const words = require('./index.js');
    document.getElementById("content").innerHTML = words();
})