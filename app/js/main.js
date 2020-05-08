$('.menu-icon').on('click', () => {
    $('.menu-icon').find('.menu-icon__bar').toggleClass('active');
    $('.mask').slideToggle();
});
