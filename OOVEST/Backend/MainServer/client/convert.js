var date = '2019-09-02 11:39:41';
var t = new Date(date.replace(' ', 'T') + 'Z').getTime() / 1000;
console.log(t); // 1534851476 - see for yourself

// 
var currentDate = new Date();
var history = new Date(currentDate)
history.setDate(currentDate.getDate() - 0.5)

console.log(history.toISOString())
console.log(currentDate.toISOString())

console.log(Math.floor(history.getTime() / 1000))
console.log(Math.floor(currentDate.getTime() / 1000))

console.log(currentDate.getTime() - history.getTime())

// to add 4 days to current date
