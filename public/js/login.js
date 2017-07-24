/**
 * Created by Administrator on 2017/7/13.
 */
//=======================验证手机
function ValidateMobile(mobile) {
    var ismobi = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/.test(mobile);
    if (!ismobi || isNaN(mobile) || mobile.length != 11) {
        return false;
    }
    return true;
}
//======================验证字符格式
function ValidateChar(str) {
    var isok = /^\w{6,24}$/.test(str);   /*字母数字下划线验证*/
    if (!isok || isNaN(isok)) {
        return false;
    }
    return true;
}
//======================来源网址
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return '/';
}
//登录
function login() {
    var url = getUrlParam("url"), mobile = $("#mobile").val(), pwd = $("#pwd").val(), autologin = 0;
    if ($('#autologin').is(':checked')) {
        autologin = 1;
    }
    /*电话验证*/
    if (!ValidateMobile(mobile)) {
        $("#mobile").focus();
        layer.msg("请输入正确的手机号码");
        return;
    }
    if ($("#pwd").val() == "") {
        $("#pwd").focus();
        layer.msg("请输入密码");
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/home/userlog",
        dataType: "json",
        data: { "mobile": mobile, "pwd": pwd, "autologin": autologin },
        timeout: 20000,
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            layer.load(0, { shade: false, time: 1000 });
            $("#btnSubmit").attr("disabled", true);
        },
        success: function (data, textStatus) {
            if (data.IsSuccess) {
                if (url == "/") {
                    location.href = "/home/reg";
                } else {
                    location.href = url;
                }
            } else {
                layer.msg(data.Message);
                $("#btnSubmit").attr("disabled", false);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg("状态：" + textStatus + "；出错提示：" + errorThrown);
            $("#btnSubmit").attr("disabled", false);
        }
    });
}
//=======================注册
function reg() {
    var url = getUrlParam("url"), mobile = $("#mobile").val(), pwd = $("#pwd").val(), pwd2 = $("#pwd2").val(),
        code_mobile = $("#code_mobile").val(), ref_mobile = $("#ref_mobile").val();
    /*电话验证*/
    if (!ValidateMobile(mobile)) {
        $("#mobile").focus();
        layer.msg("请输入正确的手机号码");
        return;
    }
    if (!ValidateChar(pwd)) {
        $("#pwd").focus();
        layer.msg("密码由6-24位的字母数字或下划线组成");
        return;
    }
    if (pwd2 != pwd) {
        $("#pwd2").focus();
        layer.msg("两次输入密码不一致");
        return;
    }
    if (code_mobile.length != 4) {
        layer.msg("请输入正确的短信验证码");
        $("#code_mobile").focus();
        return;
    }
    if (!$('#agree').is(':checked')) {
        layer.msg("必须同意注册协议才能注册");
        $("#agree").focus();
        return;
    }
    $.ajax({
        type: "POST",
        url: "/home/userreg",
        dataType: "json",
        data: { "mobile": mobile, "pwd": pwd, "pwd2": pwd2, code_mobile: code_mobile, ref_mobile: ref_mobile },
        timeout: 20000,
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            //$("#btnSubmit").attr("disabled", true);
            layer.load(0, { shade: false, time: 1000 });
        },
        success: function (data, textStatus) {
            if (data.IsSuccess) {
                layer.msg(data.Message);
                window.location.href = "/";
            } else {
                layer.msg(data.Message);
                $("#btnSubmit").attr("disabled", false);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg("状态：" + textStatus + "；出错提示：" + errorThrown);
            $("#btnSubmit").attr("disabled", false);
        }
    });
}
