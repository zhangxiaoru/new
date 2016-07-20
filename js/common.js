$(function(){
    var move = {index:0};
    var page = 1;
    var i = 5;
    var len = $('.outScroll_pic .scroll_pic li').length; //每版放4个图片
    var index = 0;
    var x = 1;
    $('.outScroll_pic .scroll_pic li').each(function(index,item){
        $(this).click(function () {
            var sIndex = $('.outScroll_pic .scroll_pic li').index($(this));
            move.index = sIndex%5;
            x = sIndex+1;
            $(".imagebg li").css("display","none");
            $(".imagebg").find('li:eq('+sIndex+')').css("display","block");
            $(".current").animate({ left : move.index*100 }, "fast");
        })
    })
    //向后 按钮
    $("a.s_next").click(function(){    //绑定click事件
        var $pics = $('.outScroll_pic .scroll_pic');
        var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
        if( !$pics.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
            if( x == len ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
                return;

            }else{
                if( move.index == 4 ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
                    $pics.animate({ left : '-='+500 }, "fast");  //通过改变left值，达到每次换一个版面
                    page++;
                    move.index = 0;
                    $(".current").animate({ left : move.index*100 }, "fast");
                }else{
                    move.index++;
                    $(".current").animate({ left : move.index*100 }, "fast");

                }
                x++;
                $(".imagebg li").css("display","none");
                $(".imagebg").find('li:eq('+(x-1)+')').css("display","block");
            }

        }
    });
    //往前 按钮
    $("a.s_pre").click(function(){    //绑定click事件
        var $pics = $('.outScroll_pic .scroll_pic');
        var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
        if( !$pics.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
            if( x == 1 ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
                return;
            }else{
                if( move.index == 0 ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
                    $pics.animate({ left : '0px' }, "fast");  //通过改变left值，达到每次换一个版面
                    page++;
                    move.index = 4;
                    $(".current").animate({ left : move.index*100 }, "fast");
                }else{
                    move.index--;
                    $(".current").animate({ left : move.index*100 }, "fast");

                }
                x--;
                $(".imagebg li").css("display","none");
                $(".imagebg").find('li:eq('+(x-1)+')').css("display","block");
            }

        }
    });
});

function goDetail() {
    var scrollTop = $(".detail").offset().top;
    $("body,html").animate({scrollTop: scrollTop}, 300);
}
$(".huxing_map_box_img_item a").mouseover(function (e) {
    var src = this.href;
    this.tempTitle = this.title;
    this.title = "";
    $("<div id='tooltip'></div>").appendTo(document.body).css({

        left: e.pageX + 10,
        top: e.pageY + 20,
        width:260,
        height:400,
        background:"url("+src+") no-repeat",
        backgroundSize:"100%"
    }).show();

}).mousemove(function (e) {
    $("#tooltip").css({left: e.pageX + 10, top: e.pageY + 20});
}).mouseout(function (e) {
    $("#tooltip").remove();
    this.title = this.tempTitle;
});