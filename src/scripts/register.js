
//  cookie   正则		
function $(id){
	return document.getElementById(id);
}
//随机数
function rand() {
		let randStr = "";
		for(let i = 0; i < 4; i++) {
			let bity = String.fromCharCode(Math.floor(Math.random() * 74 + 1) + 48);
			if(bity.charCodeAt(0) >= 48 && bity.charCodeAt(0) <= 57 || bity.charCodeAt(0) >= 97 && bity.charCodeAt(0) <= 122 || bity.charCodeAt(0) >= 65 && bity.charCodeAt(0) <= 90) {
				randStr += bity;
			} else {
				i--;
			}
		}
		return randStr;
	}
//图形
$("dian").onclick = function(){
	var yzmStr = rand();
	$("img").innerHTML = yzmStr;
};





//正则
var flagtel = "";
$("shouji").onblur = function(){
	reg = /^\d{11}$/;
	if( reg.test( $("shouji").value ) ){
		$("s1").innerText = "OK";
		$("s1").style.color = "green";
		flagtel = true;
	}else{
		$("s1").innerText = "错误";
		$("s1").style.color = "red";
		flagtel = false;
	}
}

var flagyan = "";
$("yanzheng").onblur = function(){
	$("s2").innerHTML = "";
	if( $("yanzheng").value == $("img").innerHTML ){
		flagyan = true;
		$("s2").innerHTML = "OK";
		$("s2").style.color = "green";
	}else{
		flagyan = false;
		$("s2").innerHTML = "错误";
		$("s2").style.color = "red";
	}
}	   
	

var flagmi = "";
$("mima").onblur = function(){
	reg = /^\w{6,16}$/;
	if( reg.test( $("mima").value ) ){
		$("s3").innerText = "OK";
		$("s3").style.color = "green";
		flagmi = true;
	}else{
		$("s3").innerText = "错误";
		$("s3").style.color = "red";
		flagmi = false;
	}
}	   

var flagmi1 = "";
$("mima1").onblur = function(){
	$("s4").innerHTML = "";
	if( $("mima1").value == $("mima").value){
		flagmi1 = true;
		$("s4").style.color = "green";
		$("s4").innerHTML = "密码一致";
	}else{
		flagmi1 = false;
		$("s4").innerHTML = "密码不一致";
		$("s4").style.color = "red";
	}
}


var flagtong = "";
$("tong").onblur = function(){
	if( $("tong").checked === true ){
		console.log(1);
		flagtong = true;
	}else{
		flagtong = false;
		console.log(2);
	}
}	
 
$("zhu").onclick = function(){
	if( flagtel && flagyan && flagmi && flagmi1 && flagtong ){
		alert("注册成功");
		var shouji = $("shouji").value;
		var mima = $("mima").value;
		var json = {
			"name" : shouji,
			"pass" : mima
		}
		var jsonStr = JSON.stringify(json);
		setCookie("cookie",jsonStr,7);

	}
}
