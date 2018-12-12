(function ($) {
	$(function () {


		/* wen.xudong's js start */
		/* 栏目模块区域焦点图 */
		var columnFocus = {};
		$('.column-focus_list').each(function (index) {
			var oName = 'columnFocus' + index;
			columnFocus[oName] = $(this).bxSlider({
				auto: true,
				autoHover: true,
				prevText: '',
				nextText: '',
				speed: 1000
			});
			$('.column-focus').eq(index).mouseout(function () {
				columnFocus[oName].startAuto();
			});
		});


		/* 数码选择 */
		$('.column-box_tab').each(function () {
			var tab = $(this).find('.column-hd_tab .tab-btn');
			var con = $(this).find('.column-con_tab .tab-con');
			tab.on('click', function () {
				$(this).addClass('cur').siblings().removeClass('cur');
				var oIndex = $(this).index();
				con.eq(oIndex).addClass('cur').siblings().removeClass('cur');
				$.each(columnFocus, function (item) {
					columnFocus[item].reloadSlider();
				});
			});
		});


		// 定位
		var domEleSta = {
			aFloorNav: $('.fixed-nav-bar .floor'),
			aMoudle: $('.floor-moudle'),
			oTop: $('.back-top')
		};
		var stair = {
			aEvent: {
				goTop: function () {
					$('body,html').animate({ 'scrollTop': 0 }, 700);
				},
				floor: function (event) {
					var ele = event.data;
					var t = ele.aMoudle.eq($(this).index()).offset().top;
					t -= 50;
					$('body,html').animate({ 'scrollTop': t }, 500);
				}
			},
			anchor: function (ele) {
				ele.oTop.click(ele, stair.aEvent.goTop);
				ele.aFloorNav.click(ele, stair.aEvent.floor);
			},
			init: function (ele) {
				stair.anchor(ele);
			}
		};
		stair.init(domEleSta);


	
		$.fn.getLazyArea = function () {		
			var lazyarea = $(this).children('textarea');
			if (lazyarea.length == 1) {
				lazyarea.hide();
				var lazyhtml = lazyarea.val();
				$(this).html(lazyhtml);
			}
		};

		$.fn.lazyNavi = function (nor, act, tm, flag, event_type) {
			var navi_over = '';
			if (event_type) {
				$(this).children().click(function () {
					var self = this;
					navi_over = setTimeout(function () {
						if ($(self) == null || $(self).attr("rel") == null) return;
						if ($(self).hasClass(nor) || !$(self).hasClass(act)) {
							if (act) {
								act_class = '.' + act;
							} else {
								act_class = '[class="' + act + '"]';
							}
							var act_navi = $(self).siblings(act_class);
							if (act) {
								act_navi.removeClass(act);
							}
							if (nor) {
								act_navi.addClass(nor);
							}
							var rel_div = act_navi.attr("rel");
							$("#" + rel_div).hide();
							var now_div = $(self).attr("rel");
							if (nor) {
								$(self).removeClass(nor);
							}
							if (act) {
								$(self).addClass(act);
							}
							if (flag) {
								$("#" + now_div).getLazyArea();
							}
							$("#" + now_div).show();
						}
					}, tm);
				});
			} else {
				$(this).children().mouseover(function () {
					var self = this;
					navi_over = setTimeout(function () {
						if ($(self) == null || $(self).attr("rel") == null) return;
						if ($(self).hasClass(nor) || !$(self).hasClass(act)) {
							if (act) {
								act_class = '.' + act;
							} else {
								act_class = '[class="' + act + '"]';
							}
							var act_navi = $(self).siblings(act_class);
							if (act) {
								act_navi.removeClass(act);
							}
							if (nor) {
								act_navi.addClass(nor);
							}
							var rel_div = act_navi.attr("rel");
							$("#" + rel_div).hide();
							var now_div = $(self).attr("rel");
							if (nor) {
								$(self).removeClass(nor);
							}
							if (act) {
								$(self).addClass(act);
							}
							if (flag) {
								$("#" + now_div).getLazyArea();
							}
							$("#" + now_div).show();
							if (act == 'category-item-active') {
								$(self).removeClass('category-item-hover');
							}

						}
					}, tm);
				});
			}
			$(this).children().mouseout(function () {
				if (navi_over) {
					clearTimeout(navi_over);
				}
			});
		};

		// 智能精选 焦点图 J_noopsycheSlide
		$('.switc').lazyNavi("", "active", 100, 1);


	});
})(window.$ || window.jQuery);;;


// 分类导航后加载
$(document).ready(function () {

	var nav = function () {
		var navItems = $('#J_CategoryItems')
		var navDropdown = $('#J_CategoryDropdown')

		var timer = null
		navItems.parent().on('mouseleave', function (e) {
			navItems.find('.item').removeClass('hover')
		})
		navDropdown.on({
			'mouseenter': function () {
				if (timer) clearTimeout(timer)
				$(this).show()
			},
			'mouseleave': function () {
				$(this).hide()
				navItems.find('.item').removeClass('hover')
			}
		})
		navItems.menuAim({
			rowSelector: '> .item',
			activate: function (item) {
				$(item).addClass('hover').siblings().removeClass('hover')
				var index = $(item).attr('data-index')
				navDropdown.show().find('#category-item-' + index)
					.show().siblings().hide()
			},
			deactivate: function () {
				if (timer) clearTimeout(timer)
				navDropdown.hide()
			},
			exitMenu: function () {
				return true
			},
			enter: function () {
				navDropdown.show()
			}
		})
	} 

	nav();
});;

