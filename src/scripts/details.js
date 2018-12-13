//放大镜

//鼠标操作小图  记录当前操作的小图下标  
$("#bottom li").click(function () {
	var index = $(this).index();
	//显示和小图对应的中图 和 大图
	$("#small img").eq(index).show().siblings().hide();
	//如果有遮罩层  在此处 设置mask的背景图片
	$("#big img").eq(index).show().siblings().hide();
})
//鼠标移入到小图上 显示遮罩层和大图显示区
$("#small").mouseover(function () {
	$("#big").show();
	$("#mask1").show();
})
$("#small").mouseout(function () {
	$("#big").hide();
	$("#mask1").hide();
})
$("#small").mousemove(function (e) {
	var e = e || event;
	var x = e.pageX - $("#mask1").width() / 2 - $("#box").offset().left;
	var y = e.pageY - $("#mask1").height() / 2 - $("#box").offset().top;
	var maxL = $("#box").width() - $("#mask1").width();
	var maxT = $("#box").height() - $("#mask1").height();
	x = Math.min(maxL, Math.max(0, x));
	y = Math.min(maxT, Math.max(0, y));
	$("#mask1").css({
		"left": x,
		"top": y
	})
	//大图x和y
	//比例关系 ： 大图/小图 = bigx/x = 大图显示区/小图显示区
	var bigImgx = x * $(".bigImage").width() / $("#mm").width();
	var bigImgy = y * $(".bigImage").height() / $("#mm").height();
	$(".bigImage").css({
		"left": -bigImgx,
		"top": -bigImgy
	})
})

//选择图片
$(function () {
	$("#bottom li").click(function () {
		$("#bottom li").eq($(this).index()).addClass("actice").siblings().removeClass("actice");
	})
})
