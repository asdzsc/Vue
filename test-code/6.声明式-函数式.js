// 命令式
var cars = [{
    name: '比亚迪',
    make: 'China',
}, {
    name: '本田',
    make: 'Japan',
}];
// let makes = []
// for (var i = 0; i < cars.length; i++) {
//     makes.push(cars[i].make);
// }
// console.log(makes);

// 声明式
var makes = cars.map(function(car) {
    return car.make;
});
console.log(makes);