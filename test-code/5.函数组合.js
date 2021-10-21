// var toUpperCase = function(x) { return x.toUpperCase(); };
// var exclaim = function(x) { return x + '!'; };

// var shout = function(x){
//   return exclaim(toUpperCase(x));
// };

// shout("send in the clowns");




var compose = (...args) => x => args.reduceRight((value, item) => item(value), x);

var toUpperCase = function(x) {
    return x.toUpperCase();
};
var exclaim = function(x) {
    return x + '!';
};

var shout = compose(exclaim, toUpperCase);

console.log(shout("send in the clowns"));

// SEND IN THE CLOWNS!