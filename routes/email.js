/**
 * Created by Administrator on 2017/7/20.
 */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service:"smtp.qq.com",
    auth:{
        user:"1441234379@qq.com",
        pass:"xp315315"
    }
});

var mailOptions = {
    from: 'Pangalink', // sender address
    to: '908714134@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

transporter.sendMail(mailOptions, function (err, info) {
    if(err){
        console.log(err);
        return
    }
    console.log('Message sent successfully!');
    console.log('Message sent: ' + info.response);
    transporter.close();
});