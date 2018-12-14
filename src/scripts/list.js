// 通用的工具 ;
// 通用的函数封装。

function _(selector){
      var ele = document.querySelectorAll(selector);
      //判断是一个，还是一组。
      if(ele.length == 0) return null;
      return  ele.length == 1 ? ele[0] : ele; 
}
function _ajax(url){
      return new Promise(function(resolve , reject){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.send(null);
            xhr.onload = function(){
                  if(xhr.status === 200){
                        resolve(xhr.response);
                  }
            }
      })
}
function _jsonp(url , cb){
      return new Promise(function( resolve , reject ){
            cb = cb ? cb : "callback";
            var randomName = "cb"+Date.now();
            var script = document.createElement("script");
            url += (/\?/.test(url) ? "&" : "?") + `${cb}=${randomName}`;
            script.src = url;
            document.body.appendChild(script);
            script.onload = function(){
                  this.remove();
            }
            window[randomName] = function(res){
                  resolve(res)
            }
      })
}
// 兼容型伪数组转换成真数组;
function _slice(args){
      return Array.prototype.slice.call(args);
}

// console.log(_);


// 选择元素;
var container = _(".container-goodslist");
// 发送ajax : jsonp 请求
var GLOBAL = {
      // 可视区的高度;
      ch : document.documentElement.clientHeight,
      // 是否在加载过程之中
      loading_flag : false

}

_jsonp("https://list.mogujie.com/search")
.then(function(res){
      // console.log(res.result.wall.list);
      // 获取商品列表;
      var goodsJSON = res.result.wall.list;
      randomPage(goodsJSON);
      // 是不是有了所有的 dom 结构那?
      // console.log(container.children);
      eleSort(container.children);
})

var goodsJson = []

// 渲染页面函数;
function randomPage(json){
      goodsJson = json;
      var html = "";
      // 根据比例计算图片高度;
      json.forEach(function(ele){
            // console.log(ele);
            html += `   <div class="goods-box">
                              <div class="good-image">
                                    <img src="${ele.show.img}" width=${ 262 } height=${ parseInt(262 / ele.show.w * ele.show.h) } alt="">
                              </div>
                              <div class="good-title">
                                    <p>${ele.title}</p>
                              </div>
                              <div class="line"></div>
                              <div class="good-detail">
                                    <span class="detail-price">
                                          ${ele.price}
                                    </span>
                                    <div class="detail-start">
                                          <i>★</i>
                                          <span>${ele.itemMarks.split(" ")[0]}</span>
                                    </div>
                                    <div>
                                    <input  class="btn-car" data-iid="${ele.iid}" type="button" value="加入购物车">
                                    </div>
                              </div>
                              
                        </div> `
      });
      container.innerHTML += html;
      return html;
}

// 等宽不等高的布局如何处理 ?
// 不用浮动布局;

function eleSort(eles){
      //以第一排为基准，排列后面所有的元素;
      var heightArray = [];
      eles = _slice(eles);
      eles.forEach(function(ele,index){

            // console.log(ele);
            // 下标截止到3 是第一排。
            // 其余的就是第二排。
            if(index <= 3){
                  // 2.1 建立标准;
                  // console.log(ele,"第一排");
                  heightArray.push(ele.offsetHeight);
            }else{
                  // console.log(ele,"第二排");
                  // 排列第二排的东西;
                  // 取最小值;
                  var min = Math.min.apply(false , heightArray);
                  // 设置定位
                  // 设置top; => 数组之中的 最小值;
                  ele.style.position = "absolute";
                  ele.style.top = min + 20 + "px";
                  // 设置left值; => 最小值的下标;

                  var minIndex = heightArray.indexOf(min);
                  ele.style.left = eles[minIndex].offsetLeft - 20 + "px"; 

                  // 最后改变标准数组;
                  heightArray[minIndex] +=  ele.offsetHeight + 20;
            }
      })
      // console.log(heightArray);
      // 让我们的数据可以在外部获取;
      GLOBAL.heightArray = heightArray;
}

// 无限加载;
// scrollTop (卷动的高度 ) + clientHeight(可视区高度 )  >= Math.min.apply(heightArray) 最小 top 值;
// 判定可加载;

onscroll = function(){
      // 如果需要加载, 发起ajax请求;
      if( !isLoad() || GLOBAL.loading_flag ) return false;
      // 开始加载数据;
      GLOBAL.loading_flag  = true;
      // setTimeout( function (){
      //       // console.log("这是一个ajax请求 , 请求成功时的回调函数");
      //       GLOBAL.loading_flag  = false;
      // } , 1000 )
      _jsonp("https://list.mogujie.com/search")
      .then(function(res){
            GLOBAL.loading_flag  = false;
            var goodsJSON = res.result.wall.list;
            randomPage(goodsJSON);
            eleSort(container.children);
      })


}

// 决定要不要加载;
function isLoad(){
      // 必要参数不存在 , 判断函数不执行。
      if( GLOBAL.heightArray === undefined ) return false;

      var st = document.body.scrollTop || document.documentElement.scrollTop;
      var mh = Math.min.apply(false, GLOBAL.heightArray )
      // console.log(ch,st, mh);

      if(GLOBAL.ch + st >= mh - 800 ) {
            return true;
      }else{
            return false;
      }
}



// 购物车

$(".container-goodslist").on("click",".btn-car",handleCarClick);

function handleCarClick(event){
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var iid = $(target).attr("data-iid");
      var nowMsg = findJson(iid)[0];
      addCar(nowMsg,iid);
}


function addCar(nowMsg , iid){
      // 存数据;
      // 1. 因为我们要存的数据是对象,但是localstroage可以存储的数据只有字符;
      // object => string;
      $.extend(nowMsg , {count : 1});
      var sNowMsg = JSON.stringify(nowMsg);
      // console.log(sNowMsg);
      // 2. 如果直接进行存储的话会导致购物车里只有一个数据。如果要储存多个，那么购物车里的数据应该以数组为数据类型;
      
      // 3. 还是覆盖是为什么，因为如果已经有了数据,那么这时候我们会覆盖之前的数据;
      // 先把结构取出来 查看一下是否存在，如果存在，我就向里面拼接,如果不存在我再建立结构;

      if(!localStorage.cart){
            localStorage.setItem("cart",`[${sNowMsg}]`);
            return false; 
      }
      // 如果存在对结构进行插入;

      // aMsg 变成数组了; localStorage 字符串转换成数组的数据;
      var aMsg = JSON.parse(localStorage.cart);

      // 如果存在数据就不push ， 而是增加 count 值;
      if(!hasIid(aMsg,iid)){
            aMsg.push(nowMsg);
      }

      //localStorage 重新设置；
      localStorage.setItem("cart",JSON.stringify(aMsg));

      // console.log(JSON.parse(localStorage.cart));
} 

function hasIid(aMsg,iid){
      for(var i = 0 ; i < aMsg.length ; i ++){
            if(aMsg[i].iid === iid){
                  aMsg[i].count ++;
                  return true;
            }
      }
      return false;
}
function findJson(iid){
      return  goodsJson.filter(function(item){
            return  item.iid === iid
      })
}




// 购物车获取;;

$(".car-item").on("mouseenter",function(){
      $(".car-list").show();

      // console.log(getCart())
     $(".car-list ul").html(renderCart());

})
$(".car-item").on("mouseleave",function(){
      $(".car-list").hide();
})

function getCart(){
      if(!localStorage.cart) return 0;
      var aMsg = JSON.parse(localStorage.cart);
      return aMsg;
}

function renderCart(){
      var html = "";
      var cart_json = getCart();
      if(!cart_json) return 0;
      var sumlist = 0;
      for(var i = 0 ; i < cart_json.length ; i ++){
            html += `<li>
            <img src="${cart_json[i].show.img}"> 
            <span>${cart_json[i].price}</span> 
            <span>${cart_json[i].count}</span>
            </li>`
            sumlist += cart_json[i].count;
      }
      $(".number").html(sumlist);
      return html;
}

$("#clear").on("click",function(){
      localStorage.clear("cart");
      $(".number").html("0")
})