/**
 * Created by Administrator on 2017/7/21.
 */
//定义aws密钥
var key = "AKIAJBR5YN6TI4IIZUKA";
var secret = "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";
//创建aws实例
var awis = require("awis");
var client = awis({
    key: key,
    secret: secret
});

// 调用UrlInfo接口
console.log("=============UrlInfo=================");
client({
    'Action': 'UrlInfo',                           //UrlInfo接口
    'Url': 'fens.me',                              //查询的网站
    'ResponseGroup': 'TrafficData,ContentData'     //需要的数据组
},function (err, data) {
    if(err){
        console.log(err)
    }
    console.log(data)
});

console.log("=============CategoryBrowse=================");
client({
    'Action': 'CategoryBrowse',
    'Url': 'fens.me',
    'Path': 'Top/china',
    'ResponseGroup': 'LanguageCategories'
}, function (err, data) {
    if(err) console.log(err);
    console.log(data);
});


console.log("=============SitesLinkingIn=================");
client({
    'Action': 'SitesLinkingIn',
    'Url': 'fens.me',
    'ResponseGroup': 'SitesLinkingIn'
}, function (err, data) {
    if(err) console.log(err);
    console.log(data);
});


console.log("=============TrafficHistory=================");
client({
    'Action': 'TrafficHistory',
    'Url': 'fens.me',
    'ResponseGroup': 'History'
}, function (err, res) {
    if(err) console.log(err);
    console.log(res.trafficHistory);
    console.log(res.trafficHistory.range);
    console.log(res.trafficHistory.site);
    console.log(res.trafficHistory.start);
    console.log(res.trafficHistory.historicalData);
    console.log(res.trafficHistory.historicalData.data);
    console.log(res.trafficHistory.historicalData.data.length);
    res.trafficHistory.historicalData.data.forEach(function (item) {
        console.log(item.date);
        console.log(item.pageViews);
        console.log(item.rank);
        console.log(item.reach);
    });
});
