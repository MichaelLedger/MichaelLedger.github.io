    function homeNav(){

        $(".homeNav li:gt(9)").hide();
        var _h = $(document).height();
        $(".homeMask").height(_h);
        var h = $(".homeMenu ul").height();
        $(".homeMenu").css(top,"h");
        $(".homeNav li.navMore a").click(function(){

            if($(".homeNav li:gt(9)").is(":visible")){
                $(".homeNav li:gt(9)").hide();
                $(".homeMask").hide();
                $(".homeNav p").hide();
            }else{
                $(".homeNav li:gt(9)").show();
                $(".homeMask").show();
                $(".homeNav p").show();
            }
        });
        $(".homeNav p").click(function(){
            $(".homeNav li:gt(9)").hide();
            $(".homeMask").hide();
            $(".homeNav p").hide();
        });
    }
    function infoNav(){
      //  var h = $(".infoMenu ul").height();
       // $(".infoMenu").css(top,"h");
        $(".infoMask").height($(document).height());
        $(".moreBtn").click(function(){
            if($(".infoMenu").is(":visible")){
                $(".infoMenu").hide();
                $(".infoMask").hide();
            }else{
                $(".infoMenu").show();
                $(".infoMask").show();
            }
        });
        $(".infoMenu p").click(function(){
            $(".infoMenu").hide();
            $(".infoMask").hide()
        });
    }
    function goTop(){
        $('.goTop').click(function(){
            $('html,body').animate({'scrollTop':'0px'},700);
        });
    }
$(function(){
homeNav();
})
	$(function(){
		goTop();
		infoNav();
	})