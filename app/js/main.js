// 変数宣言
const $img = $('.main-visual__img');
const num = $img.length;
const targetHeight = $('.main-visual').height();
let count = 0;
let ret = ('00' + count + 1).slice(-2);
numCounter(count, num);

const cursor = $(".cursor");
const cWidth = 20;
let mouseX = 0;
let mouseY = 0;

$(window).on('mousemove', function (e) {
    mouseX = e.pageX;
    console.log(mouseX);
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


$('.menu-icon').on('click', () => {
    $('.menu-icon').find('.menu-icon__bar').toggleClass('active');
    $('.mask').slideToggle();
});

$('.scrollbar').on('click', () => {
    slide();
});

function dispNum(num) {
    return ('00' + num).slice(-2);
}

function slide() {
    count++;
    if (count >= num) {
        count = 0;
    }
    let result = targetHeight * count;
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