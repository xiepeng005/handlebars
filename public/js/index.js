jQuery("#slide-fade").slide({
    titCell: ".hd ul", mainCell: ".bd ul", effect: "fold", autoPlay: true,interTime: 5000, autoPage: true, trigger: "mouseover"
});
$(function(){
    $("#index_videos").find(".new-video-list li").each(function(){
        $(this).mouseenter(function(){
            $(this).addClass("on").siblings().removeClass("on");
            $(this).parents(".new-video-list").siblings(".video").find("img").attr("src",$(this).attr("data-img"));
            $(this).parents(".new-video-list").siblings(".video").find(".video-tip a").attr("href",$(this).attr("data-href"));
        })
    })
});