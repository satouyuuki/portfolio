// 変数宣言
const $img = $('.top-visual__img');
const num = $img.length;
const windowHeight = $(window).outerHeight();

let count = 0;
let ret = ('00' + count + 1).slice(-2);

// 初期ロード時のイベント
numCounter(count, num);
matchCategory(count);
imgSrcReplace();

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
// ボタン非表示
pagetop.hide();

pagetop.click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
    return false;
});


// リサイズイベント
$(window).on('resize', () => {
    imgSrcReplace();
});

// スクロールイベント
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        pagetop.fadeIn();
    } else {
        pagetop.fadeOut();
    }
    $('.fadein').each(function () {
        const elemPos = $(this).offset().top,
            scroll = $(window).scrollTop();
            // windowHeight = $(window).height();
        console.log({ elemPos, scroll, windowHeight });
        if (scroll > elemPos - windowHeight + 100) {
            $(this).addClass('scrollin');
        }
    });
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
        $('body, a').css('cursor', 'initial');
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
                }, 1500);
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
                }, 1000);
            })
            .then(function () {
                setTimeout(function () {
                    $('.mask').slideUp();                    
                }, 2500);
            })
            .then(function (result) {
                setTimeout(function () {
                    $fadeinUnder.each(function () {
                        $(this).removeClass('off');
                    });
                }, 3500);
            })
    }
});

$('.scrollbar').on('click', () => {
    slide(num);
});


function imgSrcReplace() {
    if ($img.length !== 0) {
        if (isWinSize()) {
            const src = $img.attr('src').replace('pc', 'sp');
            $img.attr('src', src);
        } else {
            const src = $img.attr('src').replace('sp', 'pc');
            $img.attr('src', src);
        }        
    }
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

function dispNum(num) {
    return ('00' + num).slice(-2);
}

function slide(totalNum) {
    count++;
    if (count >= totalNum) {
        count = 0;
    }
    let result = windowHeight * count;
    $('.main-fix').css('transform', `translateY(-${result}px)`);
    numCounter(count, num);   
    matchCategory(count);
}

function numCounter(num, totalNum) {
    if (num == 0) {
        $('#prevNum').css('display', 'none');
    } else {
        $('#prevNum').css('display', 'block');
        $('#prevNum').text(dispNum(num));
    }
    if (totalNum < num + 2) {
        $('#nextNum').css('display', 'none');
    } else {
        $('#nextNum').css('display', 'block');
        $('#nextNum').text(dispNum(num + 2));
    }
    $('#currentNum').text(dispNum(num + 1));
    $('#totalNum').text(dispNum(totalNum));
}
function matchCategory(count) {
    const text = $(`.visual-link__text--grey:eq(${count})`).text();
    const arr = [
        'WEB',
        'LOGO / ILLUSTRATION',
        'VISUAL'
    ];
    arr.forEach((elem, i) => {
        console.log({ elem, i });
        if (elem.indexOf(text) > -1) {
            $('.sidemenu__text-min').removeClass('active');
            $(`.sidemenu__text-min:eq(${i})`).addClass('active');
        }
    });
}