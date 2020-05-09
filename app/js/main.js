// 変数宣言
const $img = $('.top-visual__img');
const num = $img.length;
const windowHeight = $(window).outerHeight();

let count = 0;
let ret = ('00' + count + 1).slice(-2);

// 初期ロード時のイベント
numCounter(count, num);
imgSrcReplace();

const cursor = $(".cursor");
const cWidth = 40;
let mouseX = 0;
let mouseY = 0;

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
    mouseX = e.pageX;
    mouseY = e.pageY;
    cursor.css({
        //カーソルの真ん中に座標軸が来るよう、
        //カーソルの大きさの半分を引きます
        left: mouseX - (cWidth / 2),
        top: mouseY - (cWidth / 2)
    });
    $("a").on({
        "mouseenter": function () {
            cursor.addClass("is-active");
        },
        "mouseleave": function () {
            cursor.removeClass("is-active");
        }
    });
});

pagetop.click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
    return false;
});

$('.menu-icon').on('click', () => {
    $('.menu-icon').find('.menu-icon__bar').toggleClass('active');
    $('.mask').slideToggle();
    $('body').toggleClass('is-mask');
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