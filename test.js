

//1到4，4个数字。随机打印出来，打印4次不重复的数字。
var arr = [];
var i = 0;
while (i < 4) {
    var num = Math.floor(Math.random() * 4 + 1);
    if (arr.indexOf(num) == -1) {
        arr.push(num);
        i++;
    }
}
console.log(arr);




