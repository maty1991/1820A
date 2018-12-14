
// land 登陆
var ulist = document.getElementsByClassName("li");
var olist = document.getElementsByClassName("ol");

for(var i = 0 ; i < ulist.length ; i++){
	ulist[i].index = i;
	ulist[i].onclick = function(){
		for( var j = 0 ; j < olist.length ; j++ ){
				
				ulist[j].style.backgroundColor = "";
				olist[j].style.display = "none";
			}
			this.style.backgroundColor = "#ef5555";
			olist[this.index].style.display = "block";
	}
}

 

function $(id){
	return document.getElementById(id);
}
$("denglu").onclick = function(){
	var shouji = $("shouji").value;
	var mima = $("mima").value;
	var coo = getCookie("cookie");
	console.log(coo);
	if(shouji == coo.name && mima == coo.pass){
		alert("登录成功!");
		location.href = "../pages/index.html";	
	}

	
}




