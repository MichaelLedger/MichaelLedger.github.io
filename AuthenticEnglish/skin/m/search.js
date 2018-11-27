document.writeln("<script type=\"text/javascript\">(function(){document.write(unescape(\'%3Cdiv id=\"bdcs\"%3E%3C/div%3E\'));var bdcs = document.createElement(\'script\');bdcs.type = \'text/javascript\';bdcs.async = true;bdcs.src = \'http://znsv.baidu.com/customer_search/api/js?sid=5064094039619107710\' + \'&plate_url=\' + encodeURIComponent(window.location.href) + \'&t=\' + Math.ceil(new Date()/3600000);var s = document.getElementsByTagName(\'script\')[0];s.parentNode.insertBefore(bdcs, s);})();</script>");
document.writeln("</div>");


function on_focus(th){
	if($(th).val() == val){
$(th).val("");
	}
}
function on_blur(th){
	if($(th).val() == ""){
$(th).val(val);
	}
}
