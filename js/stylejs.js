// JavaScript Document
$(function(){
    //var area = $('.lp_area');
    var lps = $('.nl_con ul li');
    $(document).on('click', '.area', select);
    $(document).on('click', '.railway', select);
    $(document).on('click', '.price', select);
    $(document).on('click', '.huxing', select);
    $(document).on('click', '.del_all', selectAll);

	//右侧头部定位
	var oNavP=$('.nhouse_list_nav');
	var oShaiX=$('.shaixuan');
	var oNlC=$('.nl_con');
	$(window).scroll(function(){
		if ($(window).scrollTop()>600){
			oNavP.css({'position':'fixed','top':'0'});
			oShaiX.css({'position':'fixed','top':'42px'});
			oNlC.eq(0).css('margin-top','65px');
			oNlC.eq(1).css('margin-top','65px');
			oNlC.eq(2).css('margin-top','15px');
		}else{
			oNavP.css({'position':'relative'});
			oShaiX.css({'position':'relative','top':'0'});	
			oNlC.css('margin-top','10px');
			}	
	})
	//tab
	var oNav=$('.nhouse_list_nav li')
	var oList=$('.nhouse_list');
	
	//关注楼盘
	var oNum=$('#num');
	//oNum.text(oNlC.eq(2).children('ul').children('li').length);
	//筛选
	var oSX=$('.shaixuan li span');
	var oEm=$('.shaixuan li div em');
	var oXZ=$('.xuanze');
	var oHL=$('.honglou');
	var flag=true;
	oXZ.find('input').click(function(){
		var oI=oXZ.find('input').index(this);
		if(oHL.eq(oI).css('color')=='rgb(51, 51, 51)'){
            var href=$('#hbUrl').html();
            window.location.href=href;
            oHL.eq(oI).css('color','rgb(255, 51, 51)');
		}else{
            var allUrl=$("#allUrl").attr('href');
            window.location.href=allUrl;
			oHL.eq(oI).css('color','rgb(51, 51, 51)');
		}
	});
	
	//红包
	var oNCli=$('.nl_con>ul>li');
	var oHB=$('.hongbao>a>img');
	var oNotice=$('.notice');
	var Arr=[2,-1,5,2];	
	var x=0,timer=null,oIndex=0;
    oNCli.hover(function(){
        oI=oNCli.index(this);
        clearInterval(timer);
        if(oNCli.eq(oI).attr('class')=="have_hb"){
            timer=setInterval(function(){
                x++;
                oNCli.eq(oI).find('.hongbao').find('img').animate({'top':Arr[x]+'px'},200);
                if(x==Arr.length-1){
                    clearInterval(timer);
                    x=0;
                }
            },100);
        }
        oNotice.hide();
        var liNotice =$(this).find(".notice");
        liNotice.show();
    });

	oNCli.mouseleave(function(){
		clearInterval(timer);
		oHB.eq(oI).animate({'top':2+'px'},300);
	    x=0;
	});

    //区域点击更多和收起
    loadmore = function(obj){
        var val = $(obj).text();
        if(val == "更多"){
            $("#lp_area_more").hide();
            $("#quyu_around").hide();
            $("#lp_area_shouqi").show();
        }else{
            $("#quyu_around").show();
            $("#lp_area_shouqi").hide();
            $("#lp_area_more").show();
        }
        $("#quyu_name").find('a').each(function(){
           if($(this).data('control') == 1){
               $(this).toggle();
           }
        });
    };
    //判断是否显示更多
    var i = 1;
    $("#quyu_name").find('a').each(function(){
        if($(this).attr('class') == 'hui'){
            if(i > 20){
                $("#lp_area_more").click();
            }
        }
        i++;
    });
    //清空已选条件
    $("#emptyConditionBtnNew").click(function(){
        location.href="/house/s/";
    });

});
    function select(){
        var area = $(this).html(),_cls = $(this)[0].className.split(" "),html="",$dqtj = $(".dqtj_all a");

        $(this).siblings().removeClass("hui");
        $(this).addClass("hui");

        if($(this).hasClass("item")){
            $(this).remove();
            $("."+_cls[1]).removeClass("hui");
            $(".none_"+_cls[1]).addClass("hui");
            if($(".dqtj_all a").length == 1) $('.dqtj').hide();
        }else if($(this)[0].className.indexOf("none") > -1){
            $dqtj.each(function(index,item){
                if($(this).hasClass(_cls[1])){
                    $(this).remove();
                }
            });
            if($(".dqtj_all a").length == 1) $('.dqtj').hide();
        }else{
            $('.dqtj').show();
            $(".dqtj_all a").each(function(index,item){
                if($(this).hasClass(_cls[0])){
                    $(this).remove();
                }
            });
            html = '<a href="#" class="item '+_cls[0]+'">'+area+'</a>';
            $('.del_all').before(html);

        }
        filterLP();
    }

    function filterLP(){
        var count = 0;
        var index = $(".dqtj_all a").length- 1;
        var $dqtj = $(".dqtj_all").find("a:lt("+index+")");

        $('.nl_con ul li').each(function(index,item){
            var _this = $(this);
            _this.flag = true;
            if($dqtj.length>0){
                $dqtj.each(function(a,b){
                    var tj_this = $(this);
                    var type = tj_this[0].className.split(" ")[1];
                    var data = _this.data(type);
                    if(type == 'price'){
                        var priceAry = tj_this.html().split("-");
                        if(priceAry.length==1){
                            priceAry = priceAry[0].split("以");
                            if(priceAry[1]=="下"){
                                if(parseInt(data) > parseInt(priceAry[0])) _this.flag = false;
                            }else if(priceAry[1]=="上"){
                                if(parseInt(data) < parseInt(priceAry[0])) _this.flag = false;
                            }
                        }else{
                            if(parseInt(data) >= priceAry[0] && parseInt(data) <= priceAry[1])
                                _this.flag = true;
                            else
                                _this.flag = false;
                        }

                    }else{
                        if(data.indexOf(tj_this.html()) == -1){
                            _this.flag = false;
                        }
                    }

                });
            }

            if(_this.flag){
                _this.show();
                count++;
            }else{
                _this.hide();
            }

        });
        $('.total').html(count);
    }
    function selectAll(){

        var last = $(".dqtj_all a").last();
        $(".dqtj_all").empty().append(last);
        $('.dqtj').hide();

        $('.area,.railway,.price,.huxing').removeClass('hui');
        $('.none_area,.none_railway,.none_price,.none_huxing').addClass('hui');


        filterLP();
    }