// 変数宣言
const windowHeight = $(window).outerHeight();

const cursor = $(".cursor");
const cWidth = 40;
let mouseX = 0;
let mouseY = 0;
const delay = 10;

// fadein系の変数
const $fadein = $('.fadein');
const $fadeinLeft = $('.fadein-left');
const $fadeinUnder = $('.fadein-under');
const pagetop = $('.pagetopbar');

// 初期ロード時のイベント
// matchCategory(count);
// imgSrcReplace();
smoothSlide();

// ボタン非表示
pagetop.hide();

pagetop.click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
    return false;
});

// ロードイベント(画像の高さ取得等)
$(window).on('load', function () {
    // scrollPos();
    // const mainOffset = $('.main').offset().top;
    // const mainHeight = $('.main').outerHeight();
    // const headerHeight = $('.header').outerHeight();
    // console.log({ mainHeight, mainOffset, headerHeight });

});

// リサイズイベント
$(window).on('resize', () => {
    // imgSrcReplace();
    // scrollPos();
});

// スクロールイベント
$(window).scroll(function () {
    smoothSlide();
    if ($(this).scrollTop() > 100) {
        pagetop.fadeIn();
    } else {
        pagetop.fadeOut();
    }
});

// カーソル系の処理
$(window).on('mousemove', function (e) {
    if (!isWinSize()) {
        $('body, a').css('cursor', 'none');
        mouseX = e.pageX - (cWidth / 2);
        mouseY = e.pageY - (cWidth / 2);
        setTimeout(() => {
            cursor.css({
                "opacity": "1",
                "transform": "translate(" + mouseX + "px," + mouseY + "px)"
            });
        }, 150);
        $("a").on({
            "mouseenter": function () {
                cursor.addClass("is-active");
            },
            "mouseleave": function () {
                cursor.removeClass("is-active");
            }
        });
    } else {
        $('body, a').css('cursor', 'pointer');
    }
});

pagetop.click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
    return false;
});


var defer = new $.Deferred().resolve();
$('.menu-icon').on('click', () => {
    $('.menu-icon').find('.menu-icon__bar').toggleClass('active');
    $('body').toggleClass('is-mask');
    if ($('body').hasClass('is-mask')) {
        defer.promise()
            .then(function () {
                $('.mask').slideDown();
            })
            .then(function (result) {
                $fadeinLeft.each(function () {
                    $(this).removeClass('off');
                    $(this).addClass('on');
                });
            })
            .then(function (result) {
                setTimeout(function () {
                    $fadeinUnder.each(function () {
                        // $(this).removeClass('off');
                        $(this).addClass('on');
                    });                    
                }, 500);
            })

    } else {
        defer.promise()
            .then(function (result) {
                setTimeout(function () {
                    $fadeinUnder.each(function () {
                        $(this).removeClass('on');
                        $(this).addClass('off');
                    });
                },500);
            })
            .then(function (result) {
                setTimeout(function () {
                    $fadeinLeft.each(function () {
                        $(this).removeClass('on');
                        $(this).addClass('off');
                    });
                }, 500);
            })
            .then(function () {
                setTimeout(function () {
                    $('.mask').slideUp();                    
                }, 1500);
            })
            .then(function (result) {
                setTimeout(function () {
                    $fadeinUnder.each(function () {
                        $(this).removeClass('off');
                    });
                }, 2500);
            })
    }
});

function smoothSlide() {
    $fadein.each(function () {
        const elemPos = $(this).offset().top,
            scroll = $(window).scrollTop();
        // windowHeight = $(window).height();
        console.log({ elemPos, scroll, windowHeight });
        if (scroll > elemPos - windowHeight + 100) {
            $(this).addClass('scrollin');
        }
    });
}

function isWinSize() {
    let windowWidth = $(window).outerWidth();
    const windowSm = 767;
    if (windowWidth <= windowSm) {
        return true;  
    }
    else {
        return null;
    }
}

