/*
 * 성낙천
 * 
 * 모달 팝업 처리 및 추가 스크립트 기능
 */

//info ={id, url , title, width, height}
//modal, window를 한번에 변경하기 위해 함수로 제공.
//현재 popup형태로 추후 modal형태로 변경할 경우 함수 내용 변경
function windowOpen(info) {
	modalOpen(info);
}

function windowClose() {
	setTimeout('modalClose();', 100);
}
//현재 popup 형태로 추후 modal형태로 변경할 경우 함수 내용 변경	
function windowCloseWithParentRefresh() {
	modalParentRefresh();
	setTimeout('modalClose();', 100);
}
function ParentRefresh() {
	modalParentRefresh();
}


function Screen() {
    var overlayBgColor;
    var overlayOpacity;
    var containerBorderSize;
    var containerResizeSpeed;
    var openFun;
    var closeFun;
    var screen_resize;
};
Screen.prototype = {
    init: function(setting) {
        if (setting.openFun) this.openFun = setting.openFun;
        if (setting.closeFun) this.closeFun = setting.closeFun;
        this.overlayBgColor = '#000';
        this.overlayOpacity = 0.6;
        this.containerBorderSize = 10;
        this.containerResizeSpeed = 400;
        this.screen_resize = function() {
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var originWidth = $("#wmp_wrap").width();
            var originHeight = $("#wmp_wrap").height();
            var screenW = 0;
            var screenH = 0;

            if (winWidth > originWidth) {
                screenW = winWidth;
            }
            else {
                screenW = originWidth;
            }
            if (winHeight > originHeight) {
                screenH = winHeight;
            }
            else {
                screenH = originHeight;
            }

            return new Array(screenW, screenH);
        };
    },
    open: function() {
    	$('body').append('<div id="jquery-overlay"></div>');
        var screenSize = this.screen_resize();
        $('#jquery-overlay').css({
            backgroundColor: this.overlayBgColor,
            opacity: this.overlayOpacity,
            width: screenSize[0],
            height: screenSize[1]
        }).fadeIn();
        $(window).bind("resize", this, function() {
            var screenSize = arguments[0].data.screen_resize();
            $('#jquery-overlay').css({
                width: screenSize[0],
                height: screenSize[1]
            });
        });
        $('embed, object, select').css({ 'visibility': 'hidden' });
        if (this.openFun != null)
            this.openFun();
    },
    close: function() {
        if (this.closeFun != null)
            this.closeFun();

        $('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
        $('embed, object, select').css({ 'visibility': 'visible' });
    }
};

var modalWindowName = null;
// 모달
var modal = function(){
	var dialogID = "you9ri_modal_";
	var frameID = "you9ri_frame_";
	var items = new Array();
	var overlay = new Screen();
	overlay.init({});
	//setting : {id, url, title, width, height, isHidn, closeRefresh}
	function open(setting)
	{
		var existsModal = false;
		var existsParent = (window.name.indexOf(frameID) == 0) ? true : false;
		
		if(existsParent){ 
			parent.modal.open(setting); 
			return;
		}
		for(var i = 0 ; i < items.length ; i++)
		{
			if(items[i].parentWinName == setting.parentWin && items[i].id == setting.id)
			{
				$("#" + dialogID + items[i].timeId +" iframe").attr("src", setting.url);
				existsModal = true;
				break;
			}
		}
		if(!existsModal)
		{
			var timeId = (new Date()).toFormatString("yyyyMMddHHmmss");
			var blnOverlay = ($(".ui-widget-overlay").css("display") == "block") ? false : true;
			$("body").append("<div id='" + dialogID + timeId + "' title='" + setting.title + "'><iframe id='" + frameID + timeId + "' name='" + frameID + timeId + "' frameborder='0' scrolling='auto'></iframe></div>");
			
			if(blnOverlay)
			{
				overlay.open();
			}
			$("#" + dialogID + timeId).dialog({
				width: setting.width,
				height: setting.height,
				resizable: false 
			}).bind("dialogclose", timeId, function(e){
				for(var i = items.length -1 ; i >=0 ; i--)
				{
					if(items[i].parentWinName == frameID + e.data)
					{
						$("#" + dialogID + items[i].timeId).dialog("close");
					}
				}
				for(var i = items.length -1 ; i >=0 ; i--)
				{
					if(items[i].timeId == e.data)
					{
						//메모리 누수 방지
						if(window.frames[frameID + items[i].timeId].unload) window.frames[frameID + items[i].timeId].unload();
						$("#" + frameID + items[i].timeId).attr("src", "about:blank");
						$("#" + dialogID + timeId).remove();
						if(items[i].parentWinName.indexOf("you9ri_") >= 0)
						{
							if(items[i].closeRefresh) window.frames[items[i].parentWinName].Refresh();
						}
						else
						{
							if(items[i].closeRefresh) Refresh();
							overlay.close();
						}
						$("#" + dialogID + items[i].timeId).remove();
						items.splice(i, 1);
						break;
					}
				}
			}).bind(
				"dialogresize", 
				{timeId: timeId, width: setting.width, height: setting.height}, 
				function(e){
					if(e.data.width - 15 < $(this).width()){
						$("#" + frameID + e.data.timeId).css("width", $(this).width());
					}
					if(e.data.height - 30 < $(this).height()){
						$("#"  + frameID + e.data.timeId).css("height", $(this).height() - 30);
					}
				}
			);
			if(blnOverlay)
			{
			//	$("#jquery-overlay").css({width:0, height:0});
			//	$("#jquery-overlay").css({"width" : $("#wrap").width(), "height" : $("#wrap").height()});
			}
			$("#" + frameID + timeId).attr("src", setting.url).css({"width": $("#" + dialogID + timeId).width(), "height" : setting.height - 70});
			if(setting.hidn != null && setting.hidn == true)
			{
				$("#" + dialogID + timeId).css("display", "none");
			}
			modalWindowName = frameID + timeId;
			items.push({
				winName : frameID + timeId,
				parentWinName : setting.parentWin,
				timeId : timeId,
				id: setting.id,
				url :setting.url, 
				title: setting.title, 
				width: $("#" + frameID + timeId).width(), 
				height: $("#" + frameID + timeId).height(), 
				hidn : setting.hidn,
				closeRefresh : setting.closeRefresh,
				existsCloseEvent : false
			});
			setting = null;
			timeId = null;
			blnOverlay = null;
		}
	}
	function childClose(winName)
	{
		for(var i = items.length -1 ; i >=0 ; i--)
		{
			if(items[i].parentWinName == winName)
			{
				$("#" + dialogID + items[i].timeId).dialog("close");
			}
		}
	}
	function close(winName, handle)
	{
		if(handle == null)
		{
			$("#" + winName.replace(frameID, dialogID)).dialog("close");
		}
		else
		{
			$("#" + winName.replace(frameID, dialogID)).bind("dialogclose", function(){handle(); });
			$("#" + winName.replace(frameID, dialogID)).dialog("close");
		}
	}
	function closeEvent(winName, handle)
	{	
	}
	function parentRefresh(winName)
	{
		for(var i = 0 ; i <items.length; i++)
		{
			if(items[i].winName == winName && items[i].existsCloseEvent == false)
			{
				items[i].existsCloseEvent = true;
				$("#" + winName.replace(frameID, dialogID)).bind("dialogclose", items[i].parentWinName, function(e){  
					if(e.data.indexOf(frameID) >=0)
					{
						if(window.frames[e.data] != null && window.frames[e.data].Refresh != null)
						{
							window.frames[e.data].Refresh();
						}
					}
					else
					{
						if(self.Refresh != null) Refresh();
					}
				});
				break;
			}
		}
	}
	function parentWindow(winName)
	{
		for(var i = 0 ; i <items.length; i++)
		{
			if(items[i].winName == winName)
			{  
				if(items[i].parentWinName.indexOf(frameID) >=0)
				{
					return window.frames[items[i].parentWinName];
				}
				else
				{
					return self;
				}
				break;
			}
		}
		return null;
	}
	function show(winName)
	{
		$("#" + winName.replace(frameID, dialogID)).css("display", "block");
	}
	function frameResize(winName, width, height)
	{
		var winWidth = $("#" + winName).width();
		var winHeight = $("#" + winName).height();
		height = height + 30;
		var bln = false;
		if(winWidth < width)
		{
			$("#" + winName).css("width",width);
		}
		else if(winWidth > width)
		{
			bln = true;
		}
		if(winHeight < height)
		{
			$("#" + winName).css("height",height);
		}
		else if(winHeight > height)
		{
			bln = true;
		}
		if(bln)
		{
			for(var i =0 ; i < items.length; i++)
			{
				if(items[i].winName == winName)
				{
					if(width < items[i].width)
					{
						$("#" + winName).css("width", items[i].width - 10);
					}
					if(height < items[i].height)
					{
						$("#" + winName).css("height", items[i].height);
					}
					break;
				}
			}
		}
	}
	function clear()
	{
		dialogID = null;
		frameID = null;
		items = null;
		overlay.close();
		overlay = null;
	}
	return { 
		open : function(setting)
		{
			open(setting);
		},
		close : function(winName, handle)
		{
			close(winName, handle);
		},
		childClose : function(winName)
		{
			childClose(winName);
		},
		closeEvent :function(winName, handle)
		{
			closeEvent(winName, handle);
		},
		parentRefresh : function(winName)
		{
			parentRefresh(winName);	
		},
		parentWindow : function(winName)
		{
			return parentWindow(winName);
		},
		show : function(winName)
		{
			show(winName);
		},
		frameResize : function(winName, width, height)
		{
			frameResize(winName, width, height);
		},
		clear : function()
		{
			clear();
		}
	};
}();

//modal 오픈

//setting : {id, url, title, width, height, hidn, handle}
function modalOpen(setting)
{
	modal.open({
		parentWin :window.name,
		id: setting.id, 
		url: setting.url, 
		title: setting.title, 
		width: setting.width, 
		height: setting.height, 
		hidn : setting.hidn,
		closeRefresh : setting.closeRefresh
	});
}
//modal close - close 시 event실행시 handle에 전달
function modalClose()
{
	parent.modal.close(window.name);
}
function modalChildClose()
{
	parent.modal.childClose(window.name);
}
function modalParentWindow()
{
	return parent.modal.parentWindow(window.name);
}
function modalParentRefresh()
{
	parent.modal.parentRefresh(window.name);
}
//function modalCloseEvent(handle)
//{
//	parent.modal.closeEvent(window.name, handle);
//}
//modal show
function modalShow()
{
	parent.modal.show(window.name);
}
// modal 의 frame resize
function modalFrameResize(width, height)
{
	if(parent.location.href != self.location.href)
	{
		parent.modal.frameResize(window.name, width, height);
	}
}

$(function(){
	$(window).unload(function(){
		$ajaxFileUpload  = null;
		for (var id in $.cache) {            
			if ($.cache[ id ].handle) {                
				try {
					$.event.remove($.cache[ id ].handle.elem);                
				} 
				catch(e) {}            
			}        
		}
	});
});


/* javascript 개체 확장 */
//Date 관련
Date.prototype.toFormatString = function(format) {
	var year = this.getFullYear();
	var month = this.getMonth() + 1;
	var day = this.getDate();
	var hour = this.getHours();
	var minute = this.getMinutes();
	var second = this.getSeconds();

	if (format == null) format = "yyyy-MM-dd";
	format = format.replace("yyyy", year);
	format = (month < 10) ? format.replace("MM", "0" + month) : format.replace("MM", month);
	format = format.replace("M", month);
	format = (day < 10) ? format.replace("dd", "0" + day) : format.replace("dd", day);
	format = format.replace("d", day);
	format = (hour < 10) ? format.replace("HH", "0" + hour) : format.replace("HH", hour);
	format = (minute < 10) ? format.replace("mm", "0" + minute) : format.replace("mm", minute);
	format = (second < 10) ? format.replace("ss", "0" + second) : format.replace("ss", second);

	return format;
};
Date.prototype.addDate = function(interval, addVal) {
	var year = this.getFullYear();
	var month = this.getMonth();
	var day = this.getDate();
	var hour = this.getHours();
	var minute = this.getMinutes();
	var second = this.getSeconds();
	switch (interval) {
		case "y": year = year + addVal; break;
		case "M": month = month + addVal; break;
		case "d": day = day + addVal; break;
		case "h": hour = hour + addVal; break;
		case "m": minute = minute + addVal; break;
		case "s": second = second + addVal; break;
		default: break;
	}
	return new Date(year, month, day, hour, minute, second);
};
Date.prototype.dayDiff = function(date1, date2) {
    var term = null;
    if (date2 == null) {
        term = this.getTime() - date1.getTime();
    }
    else {
        term = date1.getTime() - date2.getTime();
    }
    return term / (1000 * 60 * 60 * 24);
};
/* String 관련 */
String.prototype.toDate = function() {
    var arr = this.split("-");
    var date = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
    return date;
};

function IsImage(val) {
    return (/.bmp|.jpg|.jpeg|.png|.gif$/i.test(val));
}
function IsMovie(val) {
    return (/.wmv|.avi|.mpg|.mpeg|.rm|.ram$/i.test(val));
}
function IsFlash(val) {
    return (/.swf$/i.test(val));
}
function IsDomain(val) {
    return (/.com|.net|.org|.kr|.mobi|.in|.eu|.co.kr|.biz|.info|.ac|.tw|.tv|.cc|.cn|.com.cn|.jp|.pe.kr|.or.kr|.go.kr|.kr$/i.test(val));
}
function IsIPv4(val){
	return (/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/.test(val));
}
function IsTel(val) {
    return (/^(0(?:2|31|32|33|41|42|43|51|52|53|54|55|61|62|63|64|70))-?([0-9]{3,4})-?([0-9]{4})$/.test(val));
}
function IsMobile(val) {
    return (/^(0(?:10|11|16|17|18|19))-?([0-9]{3,4})-?([0-9]{4})$/.test(val));
}
function IsAlphabet(val) {
    return (/^[a-z]+$/.test(val));
}
function IsHangul(val) {
    return (/^[가-힣]+$/.test(val));
}
function IsAlphabetOrNumber(val) {
    return (/[a-z0-9]+/.test(val));
}
function IsInt(val) {
    return (/^([\+\-]?)([0-9]*)/.test(val));
}
function IsDouble(val) {
    return (/^([\+\-]?)([0-9]*)(\.?)([0-9]*)$/.test(val));
}
function IsDouble(val) {
    return (/^([\+\-]?)([0-9]*)(\.?)([0-9]*)$/.test(val));
}
function IsEmail(val) {
    return (/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(val));
}
function IsNum(val) {
    return /^[0-9]+$/i.test(val);
}
function to10DigitString(val)
{
	var valueString = val + "";
	var valuelength = valueString.length;
	for (var i = 10; i > valuelength; i--)
		valueString = "0" + valueString;
	return valueString;
}
function to3DigitString(val)
{
	var valueString = val + "";
	var valuelength = valueString.length;
	for (var i = 3; i > valuelength; i--)
		valueString = "0" + valueString;
	return valueString;
}
function convertUnixTimeToDate(val)
{
	return new Date(val);
}
function showWait()
{
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    $("#wait_box").css("left", winWidth / 2 - 100);
    $("#wait_box").css("top", $(window).scrollTop() + winHeight / 2 - 50);
	$("#wait_box").show();
}
function hideWait()
{
	$("#wait_box").hide();
}
