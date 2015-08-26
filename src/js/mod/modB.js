
var saySomething = require('./modA.js').saySomething;

var info = require('./modC.js');


exports.introduce = function () {

    var str = 'Hello, My Name is ' + info.name + ', I was Born in ' + info.year + ', and I Work in ' + info.company + ' now.';

    saySomething(str);
};
