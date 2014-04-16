<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="favicon.png">
<title>io:Box</title>
<link rel="stylesheet" media="screen" href="/css/common.css" />
<link rel="stylesheet" media="screen" href="/css/bootstrap.min.css" />
<link rel="stylesheet" media="screen" href="/css/bootstrap-theme.min.css" />
<script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="/js/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/bootstrap.min.js"></script>
<script type="text/javascript">
var topMenu = "${topMenu}";
var middleMenu = "${middleMenu}";
var lowMenu = "${lowMenu}";
var id = "${id}";
var idx = "${idx}";
var nickname = "${nickname}";

$(document).ready(function() {
	setMenu();	
});

function setMenu()
{
	$("#menu" + topMenu).addClass("active");
	
	if (id != "") 
	{
		$("#menuFellow").html("<a href='#'>" + nickname + "</a>");
		$("#menuLogin").html("<a href='/session/logout'>Log out</a>");
	}
}

</script>
</head>
<body>
<div id="wait_box" class="wait_box">
	<div style="padding-bottom:20px"><span class="space_right">data retrieving...</span></div>
	<div><img alt="Progress" src="/images/loading_32.gif" /></div>
</div>
<tiles:insertAttribute name="header" />
<tiles:insertAttribute name="body" />
<tiles:insertAttribute name="footer" />
</body>
</html>