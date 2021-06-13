import '@blocks/btn/btn.js';
import '@blocks/mainNav/mainNav.scss';

$('.main-nav__btn').click(function () {
  $('.main-nav__btn').toggleClass('main-nav__btn--open');
  $('.main-nav__btn').toggleClass('main-nav__btn--close');
})

$(window).on('load resize', toggleNav);

function toggleNav () {
  if ($(window).width() <= '768') {
    $('.main-nav__btn').addClass('main-nav__btn--close');
    $('.main-nav__btn').removeClass('main-nav__btn--open');
  }
}
