
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
    $("a.s_next").click(function(){
        var $pics = $('.outScroll_pic .scroll_pic');
        var page_count = Math.ceil(len / i) ;
        if( !$pics.is(":animated") ){
            if( x == len ){
                return;

            }else{
                if( move.index == 4 ){
                    $pics.animate({ left : '-='+500 }, "fast");
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
    $("a.s_pre").click(function(){
        var $pics = $('.outScroll_pic .scroll_pic');
        var page_count = Math.ceil(len / i) ;
        if( !$pics.is(":animated") ){
            if( x == 1 ){
                return;
            }else{
                if( move.index == 0 ){
                    $pics.animate({ left : '0px' }, "fast");
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

    Img.init();
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

var Img = {
    screenNum:8,
    page:1,
    index:0,
    imgTotal: 0,
    pageTotal: 0,
    source:"",


    init:function(){
        Img.imgTotal = $(".by_img_list").data("total");
        Img.pageTotal = Math.ceil(Img.imgTotal / Img.screenNum);
        Img.source = $(".by_img_list").data("source");

        $(".right_jt").click(Img.moveLeft);
        $(".left_jt").click(Img.moveRight);
        $(".by_img_list li").click(Img.showBigImg);
        $(".big_img_next").click(Img.bigMoveLeft);
        $(".big_img_prev").click(Img.bigMoveRight);

    },

    moveLeft:function(){
        if(Img.page >= Img.pageTotal) return;
        else{
            var surplus = Img.imgTotal - Img.screenNum * Img.page;
            $(".by_img_list li").each(function(index,item){
                if(surplus>Img.screenNum){
                    $(this).find("img")[0].src = "../img/"+Img.source+"/huxing_"+(parseInt(Img.screenNum * Img.page)+parseInt(index))+".jpg";
                    $(this).show();
                }else{
                    if(surplus >= index + 1){
                        $(this).find("img")[0].src = "../img/"+Img.source+"/huxing_"+(parseInt(Img.screenNum * Img.page)+parseInt(index))+".jpg";
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                }

            });
            Img.page++;
        }
    },
    moveRight:function(){
        if(Img.page == 1) return;
        else{
            Img.page--;
            $(".by_img_list li").each(function(index,item){
                    $(this).find("img")[0].src = "../img/"+Img.source+"/huxing_"+(parseInt(Img.screenNum * (Img.page - 1))+parseInt(index))+".jpg";
                    $(this).show();
            });

        }
    },
    showBigImg:function(){
        var src = $(this).find("img")[0].src;
        var start = src.indexOf("_"),end = src.indexOf("."),index = src.substring(start+1,end);
        $(".HD_nowphoto img")[0].src = "../img/"+Img.source+"/huxing_"+index+".jpg";
        $(this).addClass("img_on").siblings().removeClass("img_on");
        Img.index = $(this).index();

    },
    bigMoveLeft:function(){
        if(parseInt(Img.screenNum * (Img.page -1)+Img.index)>=Img.imgTotal-1) return;
        else{
            if((Img.index+1)%8==0){
                Img.moveLeft();
                Img.index = 0;
            }else{
                Img.index++;
            }
            $(".HD_nowphoto img")[0].src = "../img/"+Img.source+"/huxing_"+(parseInt(Img.screenNum * (Img.page - 1))+parseInt(Img.index))+".jpg";
            $(".by_img_list li:eq("+Img.index+")").addClass("img_on").siblings().removeClass("img_on");
        }

    },
    bigMoveRight:function(){
        if(parseInt(Img.screenNum * (Img.page - 1) + Img.index)<=0) return;
        else{
            if(Img.index%8==0){
                Img.moveRight();
                Img.index = Img.screenNum - 1;
            }else{
                Img.index--;
            }
            $(".HD_nowphoto img")[0].src = "../img/"+Img.source+"/huxing_"+(parseInt(Img.screenNum * (Img.page - 1) )+parseInt(Img.index))+".jpg";
            $(".by_img_list li:eq("+Img.index+")").addClass("img_on").siblings().removeClass("img_on");
        }

    }
};

