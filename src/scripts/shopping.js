// 购物车
  window.onload = function () {
    // 当家在整个js文件的时候，function getElementsByClassName() { [native code] }
    // 这个函数并没有执行
    if (!document.getElementsByClassName) {
        alert("执行了");
        // getElementsByClassName:获取所有指定的类名
        document.getElementsByClassName = function (cls) {
            console.log(cls);  //check    check-all
            var ret = [];
            var els = document.getElementsByTagName('*');
            console.log(els);  //长度是104
            for (var i = 0, len = els.length; i < len; i++) {
            // indexof()方法可返回某个指定的字符串中首次出现的位置
            // stringObject.indexOf(searchvalue,fromindex)
            // 说明：该方法将从头到尾地检索字符串 stringObject，
            // 看它是否含有子串 searchvalue。开始检索的位置在字符串的 fromindex
            // 处或字符串的开头（没有指定 fromindex 时）。如果找到一个 searchvalue，
            // 则返回 searchvalue 的第一次出现的位置。stringObject 中的字符位置是从 0 开始的。

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            console.log(ret);
            return ret;
        }
     
    }
// console.log(document.getElementsByClassName);

    var table = document.getElementById('cartTable'); // 购物车表格
    var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
    var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
    var tr = table.children[1].rows; //行
    var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
    var priceTotal = document.getElementById('priceTotal'); //总计
    var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
    var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
    var selected = document.getElementById('selected'); //已选商品
    var foot = document.getElementById('foot');

    // 更新总数和总价格，已选浮层
    function getTotal() {
        var seleted = 0;
        var price = 0;
        var HTMLstr = '';
        for (var i = 0, len = tr.length; i < len; i++) {
            //通过for循环，遍历到某一行，则通过getElementsByTagName('input')[0].checked，
            // 这句话选中这个商品
            if (tr[i].getElementsByTagName('input')[0].checked) {
                //为这个商品设置类名on
                tr[i].className = 'on';
                //拿到商品的数量之后，在原来已经选中的商品中继续叠加，叠加到商品总的数量上
                seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                 // 拿到选中商品的对应的价格，叠加到商品总额中
                price += parseFloat(tr[i].cells[4].innerHTML);
                // 把获取到的商品图片添加到浮层中
                HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
            }
            else {
                // 如果没有选中该行商品，则将没有选中的类名置为空
                tr[i].className = '';
            }
        }
        selectedTotal.innerHTML = seleted;
        // toFixed(num)可以把Number四舍五入为指定小数位数的数字
        // num规定小数的位数，是0~20之间的值，包括0和20，有些实现可以支持更大的数值范围
        // 如果省略了该参数，将用0代替。
        priceTotal.innerHTML = price.toFixed(2);
        selectedViewList.innerHTML = HTMLstr;
        // 如果没有选中任何商品，则还是默认的状态
        if (seleted == 0) {
            foot.className = 'foot';
        }
    }
    // 计算单行价格
    // 把每一行的标签tr当做参数
    function getSubtotal(tr) {
        console.log(tr);//打印出来的是对应的行标签tr里面所包含的所有的内容
        var cells = tr.cells;//把每一种商品中的所有属性赋值给cells
        var price = cells[2]; //单价 ，把每一种商品的第二个属性即，价格，赋值给price
        var subtotal = cells[4]; //小计td，解释同上
        // 选中商品数量对应的input标签，赋值给countInput
        var countInput = tr.getElementsByTagName('input')[1]; //数目input
        // console.log(tr.getElementsByTagName('input')[1]);
        var span = tr.getElementsByTagName('span')[1]; //-号
        //写入HTML
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
        //如果数目只有一个，把-号去掉
        if (countInput.value == 1) {
            span.innerHTML = '';
        }else{
            span.innerHTML = '-';
        }
    }

    // 点击选择框
    for(var i = 0; i < selectInputs.length; i++ ){
        selectInputs[i].onclick = function () {
            if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中

                console.log(this.className.indexOf('check-all'));//打印的是0
                  //selectInputs.length=6
                for (var j = 0; j < selectInputs.length; j++) {
                    //6
                    selectInputs[j].checked = this.checked;  //全部选中复选框
                    //这里的this是指所有的<input class=​"check-all check" type=​"checkbox">​

                }
            }
            if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                for (var i = 0; i < checkAllInputs.length; i++) {
                    checkAllInputs[i].checked = false;
                }
            }
            //再次调用getTotal()函数，迭代更新
            getTotal();//选完更新总计
        }
    }

    // 显示已选商品弹层
    selected.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
        }
    }

    //已选商品弹层中的取消选择按钮
    // 这里的e代表事件对象，即所谓的事件驱动源
    // 在这里这个e，即是指鼠标点击事件
    selectedViewList.onclick = function (e) {
        console.log(e);
        //为了实现多种浏览器的兼容
        var e = e || window.event;
        var el = e.srcElement;
        console.log(el);  //<img src="file:///C:/Users/Administrator/Desktop/2/style.html">
        if (el.className=='del') {
            var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0]
            console.log(input);  //<span class="del" index="3">取消选择</span>
            input.checked = false;
            // 这句话的意思是删除<span class="del" index="3">取消选择</span>
            // 所对应的div标签
             input.onclick(this);  //这里面的this是我自己添加到里面的，但是效果是一样的
        }
    }

    //为每行元素添加事件
    for (var i = 0; i < tr.length; i++) {
        //将点击事件绑定到tr元素
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
            var cls = el.className; //触发元素的class名
            console.log(cls);   //add /reduce
            //这里的this是指tr标签
            var countInout = this.getElementsByTagName('input')[1]; // 数目input
            var value = parseInt(countInout.value); //数目
            //通过判断触发元素的class确定用户点击了哪个元素
            switch (cls) {
                case 'add': //点击了加号
                    countInout.value = value + 1;
                    getSubtotal(this);
                    break;
                case 'reduce': //点击了减号
                    if (value > 1) {
                        countInout.value = value - 1;
                        getSubtotal(this);  //this指的是tr标签
                    }
                    break;
                case 'delete': //点击了删除
                    var conf = confirm('确定删除此商品吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);  //this指的是tr标签
                    }
                    break;
            }
            // 更新总数和总价格
            getTotal();
        }
        // 给数目输入框绑定keyup事件
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);  //是数字，number类型的
            console.log(this.value); //<input class="count-input" type="text" value="1">
            //判断输入框内只能是大于零的整数，不能是除数字之外的其他非法字符
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            // 下面这句话的意思是防止用户在手动输入商品数量的时候出现小数，即使出现小数
            // 也会取整的
            if (this.value != val) {
                this.value = val;
            }
            getSubtotal(this.parentNode.parentNode); //更新小计
            console.log(this.parentNode.parentNode); //指的是tr标签
            getTotal(); //更新总数
        }
    }
    // 点击全部删除
    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            var con = confirm('确定删除所选商品吗？'); //弹出确认框
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    // 如果被选中，就删除相应的行
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                        i--; //回退下标位置
                    }
                }
            }
        } else {
            alert('请选择商品！');
        }
        getTotal(); //更新总数
    }
    // 默认全选
    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick(this);  //这里的this是指的是window
    // console.log(this);
}