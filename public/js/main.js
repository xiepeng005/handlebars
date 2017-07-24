/**
 * tab切换
 * @param name
 * @param cur
 * @param num
 */
function setTab(name,cur,num){
    for(var i = 1 ; i <= num; i++){
        var nav = $("#"+name+i);
        var con = $("#con_"+name+"_"+i);
        i == cur ? nav.addClass("now"):nav.removeClass("now");
        i == cur ? con.removeClass("hide").addClass("block"):con.addClass("hide").removeClass("block");
    }
}
