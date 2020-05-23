// 変数宣言
const $img = $('.top-visual__img');
const imgTotalNum = $img.length;
let count = 0;
let result = 0;
let vlwResult = 0;
let isMoving = false;
let ret = ('00' + count + 1).slice(-2);
let tHeight = 0;
let vlwHeight = 0;

// scroll counter変数
const $prevNum = $('#prevNum');
const $nextNum = $('#nextNum');
const $currentNum = $('#currentNum');
const $totalNum = $('#totalNum');

const $topVisual = $('.top-visual');
const $visualLinkWrap = $('.visual-link-wrap');

$(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (event) { 
  var delta = event.originalEvent.wheelDelta;
  if (isMoving) return;
  navigateTo();
  if (delta < 0) {
    count++;
    if (count >= imgTotalNum) {
      count = 0;
    }
  } else {
    count--;
    if (count < 0) {
      count = imgTotalNum - 1;
    }
  }
  slideimg(count);
});

function navigateTo() {
  isMoving = true;
  setTimeout(function () {
    isMoving = false;
  }, 2000);
}

// 初期ロード時のイベント
numCounter(count, imgTotalNum);
matchCategory(count);
imgSrcReplace();
//初期画面ロード時
$(window).on('load', () => {
  tHeight = $topVisual.find('img').outerHeight();
  vlwHeight = $visualLinkWrap.find('.visual-link').outerHeight();
  $topVisual.css('height', tHeight);
  $visualLinkWrap.css('height', vlwHeight);
  scrollPos();
});

$prevNum.on('click', function () {
  count = Number($prevNum.text()) - 1;
  slideimg(count);
});
$nextNum.on('click', function () {
  count = Number($nextNum.text()) - 1;
  slideimg(count);
});
$totalNum.on('click', function () {
  count = Number($totalNum.text()) - 1;
  slideimg(count);
});

$('.sidemenu__text:eq(0)').on('click', () => {
  count = 0;
  slideimg(count);
});

$('.sidemenu__text-min').each(function (i, e) {
  $(`.sidemenu__text-min:eq(${i})`).on('click', () => {
    console.log(i);
    if (i == 0) {
      count = 0;
      slideimg(count);
    }
    else if (i == 1) {
      count = 7;
      slideimg(count);
    }
    else if (i == 2) {
      count = 12;
      slideimg(count);
    }
  });
});

// リサイズイベント
$(window).on('resize', () => {
  imgSrcReplace();
  scrollPos();
});

function imgSrcReplace() {
  if ($img.length !== 0) {
    if (isWinSize()) {
      $img.each(function () {
        const src = $(this).attr('src').replace('pc', 'sp');
        $(this).attr('src', src);
      });
    } else {
      $img.each(function () {
        const src = $(this).attr('src').replace('sp', 'pc');
        $(this).attr('src', src);
      });
    }
  }
}

function scrollPos() {
  const mainHeight = $('.main-fix').find('img:eq(0)').outerHeight(true);
  const mainWidth = $('.main-fix').find('img:eq(0)').outerWidth(true);
  const scrollbarHeight = $('.scrollbar').outerHeight();
  const mainPosLeft = $('.main-fix').find('img:eq(0)').offset().left;
  const mainPosTop = $('.main-fix').find('img:eq(0)').offset().top;
  let scrollPositionY = 0;
  let scrollPositionX = 0;
  if (isWinSize()) {
    scrollPositionX = mainWidth - 25;
  }
  else {
    scrollPositionX = mainWidth + mainPosLeft + 30;
  }
  scrollPositionY = mainHeight + mainPosTop - scrollbarHeight;
  $('.scrollbar').css({
    'top': scrollPositionY,
    'left': scrollPositionX,
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

function dispNum(num) {
  return ('00' + num).slice(-2);
}


function slideimg(counter) {
  result = tHeight * counter;
  vlwResult = vlwHeight * counter;
  $topVisual.css("transform", "translateY(-" + result + "px)");
  $visualLinkWrap.css("transform", "translateY(-" + vlwResult + "px)");
  numCounter(counter, imgTotalNum);
  matchCategory(counter);
}

function numCounter(counter, total) {
  if (counter == 0) {
    $prevNum.css('display', 'none');
  } else {
    $prevNum.css('display', 'block');
    $prevNum.text(dispNum(counter));
  }
  if (total < counter + 2) {
    $nextNum.css('display', 'none');
  } else {
    $nextNum.css('display', 'block');
    $nextNum.text(dispNum(counter + 2));
  }
  $currentNum.text(dispNum(counter + 1));
  $totalNum.text(dispNum(total));
}

// 一旦中止
function matchCategory(counter) {
  if ($('.visual-link__text--grey').length > 0) {
    const text = $(`.visual-link__text--grey:eq(${counter})`).text();
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
}