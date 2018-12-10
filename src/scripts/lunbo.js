/**
桃花坞里桃花庵，桃花庵下桃花仙；
桃花仙人种桃树，又摘桃花卖酒钱。
酒醒只在花前坐，酒醉还来花下眠；
半醒半醉日复日，花落花开年复年。
但愿老死花酒间，不愿鞠躬车马前；
车尘马足富者趣，酒盏花枝贫者缘。
若将富贵比贫贱，一在平地一在天；
若将贫贱比车马，他得驱驰我得闲。
别人笑我太疯癫，我笑他人看不穿；
不见五陵豪杰墓，无花无酒锄作田。
 */

// 轮播图
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });


