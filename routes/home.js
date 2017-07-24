var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('./model/user');
var options = {
    title: '账户登录-小豹集团',
    keyword: '小豹科技，智能交易软件，智能交易系统，外汇EA，外汇交易平台，外汇代理，外汇投资、太极动能策略',
    description: '小豹科技是一家综合型经济金融服务商，致力于打造一流智能投资交易软件和外汇交易平台，为炒外汇投资者提供智能交易软件、外汇EA、外汇代理、外汇投资等服务内容，实现最具资本市场价值的金融科技服务商！'
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
//用户登录
router.get('/', function (req, res, next) {
    res.render('./home/login',options)
});
router.get('/login', function (req, res, next) {
    res.render('./home/login',options)
});
//用户注册
router.get('/reg', function (req, res, next) {
   res.render('./home/register',options)
});
// 登录处理
router.post('/userlog', function (req, res, next) {
    var tuser = {
        username: req.body.mobile,
        password: req.body.pwd
    };
    tuser.password = getMD5Password(tuser.password);
    req.getConnection(function (err, conn) {
        if(err){
            return next(err);
        } else{
            conn.query('select * from t_user where phone_mobile = ? and login_pass = ?', [tuser.username, tuser.password], function (err, result) {
                if(err){
                    res.json({IsSuccess:false, Message:err.stack()});
                } else{
                    if(result === null || result.length === 0){
                        res.json({IsSuccess:false, Message:"用户名或密码不存在！"})
                    } else{
                        signinCheckSuccess(result, req, res);
                        res.json({IsSuccess:true, Message:"登录成功"})
                    }
                }
            })
        }
    })
});
//注册处理
router.post('/userreg', function (req, res, next) {
    var tuser = {
        mobile: req.body.mobile,
        pwd: req.body.pwd,
        pwd2: req.body.pwd2,
        code_mobile: req.body.code_mobile,
        ref_mobile: req.body.ref_mobile
    };
    tuser.pwd = getMD5Password(tuser.pwd);
    if(tuser.mobile === "" || tuser.pwd === "" || tuser.code_mobile === ""){
        res.json({IsSuccess:false, Message:"参数不正确，请重新输入！"})
    }
    req.getConnection(function (err, conn) {
        if(err){
            return next(err)
        } else{
            conn.query('call p_user_reg(?,?,?,?,?)', [tuser.mobile, tuser.pwd, '127.0.0.1', 1, 1], function (err, result) {
                if(err){
                    return next(err)
                } else{
                    var results = JSON.parse(JSON.stringify(result[0]));
                    res.json({IsSuccess:results[0].result, Message:results[0].remark})
                }
            })
        }
    })


});
//退出登录
router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if(err){
           res.json({IsSuccess:false, Message: '退出登录失败'});
        }
        res.clearCookie('handles');
        res.redirect('/home/login');
    });
});


router.get('/user', function (req, res, next) {
    req.getConnection(function (err, conn) {
        if(err){
            return next(err);
        } else{
            conn.query('select * from t_user where id = ?', [2], function (err, result) {
                if(err){
                    return next(err)
                } else{
                    res.send(result);
                }
            })
        }
    })
});

//utils
//Md5加密
function getMD5Password(content) {
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var d = md5.digest('hex'); //加密后的值d
    return d;
}
//登录成功
function signinCheckSuccess(result, req, res) {
    var userInDatabase = {
        username:result[0].phone_mobile,
        userId:result[0].id,
        phone:result[0].phone_mobile,
        email:result[0].email
    };
    req.session.logged_in = 1;
    req.session.username = userInDatabase.username;
    //showInfo(userInDatabase, res);
}
//展示用户信息
function showInfo(user, res) {
    res.render('./home/login', {
        username:user.phone_mobile,
        userId:user.id,
        phone:user.phone_mobile,
        email:user.email,
        errorInfo:'用户详情'
    });
}


module.exports = router;