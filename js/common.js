$(function(){
    var move = {index:0};
    var page = 1;
    var i = 5;
    var len = $('.outScroll_pic .scroll_pic li').length; //ÿ���4��ͼƬ
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
    //��� ��ť
    $("a.s_next").click(function(){    //��click�¼�
        var $pics = $('.outScroll_pic .scroll_pic');
        var page_count = Math.ceil(len / i) ;   //ֻҪ����������������ķ���ȡ��С������
        if( !$pics.is(":animated") ){    //�жϡ���Ƶ����չʾ�����Ƿ����ڴ��ڶ���
            if( x == len ){  //�Ѿ������һ��������,�������󣬱�����ת����һ�����档
                return;

            }else{
                if( move.index == 4 ){  //�Ѿ������һ��������,�������󣬱�����ת����һ�����档
                    $pics.animate({ left : '-='+500 }, "fast");  //ͨ���ı�leftֵ���ﵽÿ�λ�һ������
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
    //��ǰ ��ť
    $("a.s_pre").click(function(){    //��click�¼�
        var $pics = $('.outScroll_pic .scroll_pic');
        var page_count = Math.ceil(len / i) ;   //ֻҪ����������������ķ���ȡ��С������
        if( !$pics.is(":animated") ){    //�жϡ���Ƶ����չʾ�����Ƿ����ڴ��ڶ���
            if( x == 1 ){  //�Ѿ������һ��������,�������󣬱�����ת����һ�����档
                return;
            }else{
                if( move.index == 0 ){  //�Ѿ������һ��������,�������󣬱�����ת����һ�����档
                    $pics.animate({ left : '0px' }, "fast");  //ͨ���ı�leftֵ���ﵽÿ�λ�һ������
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