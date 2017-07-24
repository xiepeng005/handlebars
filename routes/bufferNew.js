/**
 * Created by Administrator on 2017/7/21.
 */
var a1 = new Buffer(0);
console.log(a1);
var a2 = new Buffer(0);
console.log(a2 == a1);
var a3 = new Buffer(10);
console.log(a3);
for(var i = 0; i< a3.length; i++){
    console.log(a3[i]);
}
var a4 = new Buffer(['a','b',12]);
console.log(a4);
var a5 = new Buffer('你好','utf-8');
console.log(a5);