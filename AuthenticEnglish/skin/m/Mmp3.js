var turl ='g8.tingvoa.com/';
var durl ='x8.tingvoa.com/';
var wurl ='www.tingvoa.com/';
var mp4=mp3.indexOf('.mp4')

if (mp3 == "") {
document.writeln('');
}

else if (mp4 == "-1")
{
	
if (lrccontent == "0") {
document.writeln('<audio preload=\"auto\" controls><source src=\"http:\/\/'+turl+'\/'+mp3+'\" id=\'mp3_fileurl\'/></audio>');
}
else
{
document.writeln("<script type=\"text/javascript\" src=\"/mp3/js/jquery.js\"></script>");
document.writeln("<script type=\"text/javascript\" src=\"/mp3/js/jquery.jplayer.js\"></script>");
document.writeln("<script type=\"text/javascript\" src=\"/mp3/js/lrc.js\"></script>");
document.writeln("<link href=\"/mp3/css/blue.css\" rel=\"stylesheet\" type=\"text/css\" />");
document.writeln("<style type=\"text/css\">");
document.writeln("* { margin:0; padding:0; }");
document.writeln("ul, ol, dl { list-style:none; }");
document.writeln(".content li.hover{ color:red; }");
document.writeln(".content{ width:99%; height:200px; background:#ccc; overflow:hidden; padding:1px;}");
document.writeln("</style>");

document.writeln("		<div id=\"jquery_jplayer_1\" class=\"jp-jplayer\"></div>");
document.writeln("");
document.writeln("		<div id=\"jp_container_1\" class=\"jp-audio\">");
document.writeln("			<div class=\"jp-type-single\">");
document.writeln("				<div class=\"jp-gui jp-interface\">");
document.writeln("					<ul class=\"jp-controls\">");
document.writeln("						<li><a href=\"javascript:;\" class=\"jp-play\" tabindex=\"1\">play</a></li>");
document.writeln("						<li><a href=\"javascript:;\" class=\"jp-pause\" tabindex=\"1\">pause</a></li>");
document.writeln("						<li><a href=\"javascript:;\" class=\"jp-stop\" tabindex=\"1\">stop</a></li>");
document.writeln("						<li><a href=\"javascript:;\" class=\"jp-mute\" tabindex=\"1\" title=\"mute\">mute</a></li>");
document.writeln("						<li><a href=\"javascript:;\" class=\"jp-unmute\" tabindex=\"1\" title=\"unmute\">unmute</a></li>");
document.writeln("						<li><a href=\"javascript:;\" class=\"jp-volume-max\" tabindex=\"1\" title=\"max volume\">max volume</a></li>");
document.writeln("					</ul>");
document.writeln("					<div class=\"jp-progress\">");
document.writeln("						<div class=\"jp-seek-bar\">");
document.writeln("							<div class=\"jp-play-bar\"></div>");
document.writeln("						</div>");
document.writeln("					</div>");
document.writeln("					<div class=\"jp-volume-bar\">");
document.writeln("						<div class=\"jp-volume-bar-value\"></div>");
document.writeln("					</div>");
document.writeln("					<div class=\"jp-time-holder\">");
document.writeln("						<div class=\"jp-current-time\"></div>");
document.writeln("						<div class=\"jp-duration\"></div>");
document.writeln("						<ul class=\"jp-toggles\">");
document.writeln("							<li><a href=\"javascript:;\" class=\"jp-repeat\" tabindex=\"1\" title=\"repeat\">循环播放</a></li>");
document.writeln("							<li><a href=\"javascript:;\" class=\"jp-repeat-off\" tabindex=\"1\" title=\"repeat off\">取消循环播放</a></li>");
document.writeln("						</ul>");
document.writeln("");
document.writeln("");
document.writeln("					</div>");
document.writeln("				</div>");
document.writeln("				<div class=\"jp-title\">");
document.writeln("					<ul>");
document.writeln("						<li>www.tingvoa.com</li>");
document.writeln("					</ul>");
document.writeln("				</div>");
document.writeln("				<div class=\"jp-no-solution\">");
document.writeln("					<span>Update Required</span>");
document.writeln("					To play the media you will need to either update your browser to a recent version or update your <a href=\"http://get.adobe.com/flashplayer/\" target=\"_blank\">Flash plugin</a>.");
document.writeln("				</div>");
document.writeln("			</div>");
document.writeln("		</div>");
document.writeln("				<div class=\"content\"><ul id=\"lrc_list\">");
document.writeln("		点击开始播放……");
document.writeln("		</ul></div>");


}
document.writeln('<div style=\'padding:5px 0px 0px 5px;\'>')

if (lrc == "" || lrc == "tingvoa.lrc" || lrc == "[标签:标题2]") {
document.writeln('<img src=/skin/m/down.gif><a href=\'http:\/\/'+turl+'\/'+mp3+'\' target=\'_blank\'>下载MP3音频<\/a>');
}
else
{
document.writeln('<img src=/skin/m/down.gif><a href=\'http:\/\/'+turl+'\/'+mp3+'\' target=\'_blank\'>下载MP3音频<\/a>');
document.writeln('<img src=/skin/m/down.gif><a href=\'http:\/\/'+turl+'\/'+lrc+'\' target=\'_blank\'>下载LRC字幕<\/a>');
}

if (txt == "") {
document.writeln('');
}
else
{
document.writeln('<img src=/skin/m/down.gif><a href=\'http:\/\/'+turl+'\/'+txt+'\' target=\'_blank\'>下载TXT听力文本<\/a>');
}
document.writeln('<\/div>')
}
document.writeln("<div style=\"clear:both\"><\/div>");