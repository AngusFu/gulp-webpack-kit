 
var action = require('./mod/modB.js');

console.log(action);
document.getElementById('btn').addEventListener('click', function () {
    action.introduce();
}, false);

