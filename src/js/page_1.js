 
var action = require('./mod/modB.js');

var styles = require("style!css!./file.css");
console.log(styles);
console.log(action);
document.getElementById('btn').addEventListener('click', function () {
    action.introduce();
}, false);

