	
//选项卡效果
var ulist = document.getElementsByClassName("ulli");
var olist = document.getElementsByClassName("olli");

for(var i = 0 ; i < ulist.length ; i++){
	ulist[i].index = i;
	ulist[i].onclick = function(){
		for( var j = 0 ; j < olist.length ; j++ ){
				
				ulist[j].style.backgroundColor = "";
				olist[j].style.display = "none";
			}
			this.style.backgroundColor = "red";
			olist[this.index].style.display = "block";
	}
}

//右边栏自定义动画
$("#right ul .biao1").mouseenter(function(){
	$(".biao2").eq($(this).index()).stop().animate({"left":"-70px"},300)
}).mouseleave(function(){
	$(".biao2").eq($(this).index()).stop().animate({"left":"0px"},300)
});


//返回顶部
var tou = document.getElementsByClassName("tou");
window.onscroll = function(){
   		var sTop = document.body.scrollTop || document.documentElement.scrollTop;
   		if( sTop > 0 ){
   			$(".tou").css("display" , "block")
   		}
   		if( sTop == 0 ){
   			tou.css("display" , "none")
   		}
 	}
 	$(".tou").click(function(){
 		document.body.scrollTop = 0 ;
 		document.documentElement.scrollTop = 0;
   		tou.style.display = "none";
 	})

 
//拖拽
// 可视区域的宽度和高度
var cw = document.documentElement.clientWidth || document.body.clientWidth;
var ch = document.documentElement.clientHeight || document.body.clientHeight;
	
	
btn.onclick = function(){	
	tuo.style.display = "block";
	mask.style.display = "block";
}

btnClose.onclick = function(){	// 点击关闭，隐藏窗口
	tuo.style.display = "none";
	mask.style.display = "none";
}

title.onmousedown = function(e){	// 窗口允许拖拽
	e = e || window.event;
	var _x = e.clientX - tuo.offsetLeft;
	var _y = e.clientY - tuo.offsetTop;
	document.onmousemove = function(e){
		e = e || window.event;
		var x = e.clientX - _x;	//x和y是当前窗口新的坐标
		var y = e.clientY - _y;
		// 边界检测
		if( x<0 ){x=0;}
		if( y<0 ){y=0;}
		if( x>cw-tuo.offsetWidth ){ x=cw-tuo.offsetWidth }
		if( y>ch-tuo.offsetHeight ){ y=ch-tuo.offsetHeight }
		// 窗口定位
		tuo.style.left = x + "px";
		tuo.style.top = y + "px";
	}
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
	return false;
}



//放大镜

  	//鼠标操作小图  记录当前操作的小图下标  
 	$("#bottom li").click(function(){
 		var index = $(this).index();
 		//显示和小图对应的中图 和 大图
 		$("#small img").eq(index).show().siblings().hide();
 		//如果有遮罩层  在此处 设置mask的背景图片
 		$("#big img").eq(index).show().siblings().hide();
 	})
 	//鼠标移入到小图上 显示遮罩层和大图显示区
 	$("#small").mouseover(function(){
 		$("#big").show();
 		$("#mask1").show();
 	})
 	$("#small").mouseout(function(){
 		$("#big").hide();
 		$("#mask1").hide();
 	})
 	$("#small").mousemove(function(e){
 		var e = e || event;
 		var x = e.pageX - $("#mask1").width()/2 - $("#box").offset().left;
 		var y = e.pageY - $("#mask1").height()/2 - $("#box").offset().top;
 		var maxL = $("#box").width() - $("#mask1").width();
 		var maxT = $("#box").height() - $("#mask1").height();
 		x = Math.min( maxL, Math.max(0,x) );
 		y = Math.min( maxT, Math.max(0,y) );
 		$("#mask1").css({
 			"left" : x,
 			"top" :y
 		})
 		//大图x和y
 		//比例关系 ： 大图/小图 = bigx/x = 大图显示区/小图显示区
 		var bigImgx = x * $(".bigImage").width()/$("#mm").width();
 		var bigImgy = y * $(".bigImage").height()/$("#mm").height();
 		$(".bigImage").css({
 			"left" : -bigImgx,
 			"top" :  -bigImgy
 		})
 	})

 //数字加减
var a = $(".num").val();
 $(".num").blur(function(){
 	$(".price").html("￥"+ a*9688 + ".00");
 })
 $(".jia").click(function(){
 	a++;
 	if(a >= 59){
 		a=59;
 	}
 	$(this).prev().val(a);
 		$(".price").html("￥"+ a*9688 + ".00");
 })
 $(".jian").click(function(){
 	a--;
 	if(a <= 0){
 		a=0;
 	}
 	$(this).next().val(a);
	 	$(".price").html("￥"+ a*9688 + ".00");
 });
 $(".num").blur(function(){
 	var a = $(".num").val();
 	$(".price").html("￥"+ a*9688 + ".00");
 })
 	


//树形

	$(".div51 ul li:not( :has(ul) )").css("list-style","none");

	
	$(".div51 ul li:has(ul)").click(function(e){
		e.stopPropagation();
		if( $(this).children("ul").is(":hidden") ){ //is方法 表示判断某个元素是否是隐藏的
			$(this).css("list-style-image","url(images/-.gif)");
		}else{
			$(this).css("list-style-image","url(images/1.gif)");
		}
		$(this).children("ul").toggle(1000);
	})

$(".div51 ul li ul li").click(function(){
		return false;
})
