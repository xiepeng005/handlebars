var express = require('express');
var router = express.Router();
var options = {
    title: '小豹科技-外汇投资_外汇交易平台_智能交易软件',
    keyword: '小豹科技，智能交易软件，智能交易系统，外汇EA，外汇交易平台，外汇代理，外汇投资、太极动能策略',
    description: '小豹科技是一家综合型经济金融服务商，致力于打造一流智能投资交易软件和外汇交易平台，为炒外汇投资者提供智能交易软件、外汇EA、外汇代理、外汇投资等服务内容，实现最具资本市场价值的金融科技服务商！'
};
var banners = {
    banners: [
        {
            title:'banner1',
            src:"/upload/banner1.jpg"
        },
        {
            title:'banner2',
            src:"/upload/banner2.jpg"
        },
        {
            title:'banner3',
            src:"/upload/banner3.jpg"
        }
    ]
};
router.use(function (req, res, next) {
    if(req.session.logged_in){
        Object.assign(options, {
            isLogin: true,
            username: req.session.username || ''
        });
    } else{
        Object.assign(options, {
            isLogin: false,
            username: null
        });
    }
    next();
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', Object.assign(options, banners));
});
router.get('/index', function (req, res, next) {
    res.render('index', Object.assign(options,banners));
});

module.exports = router;
