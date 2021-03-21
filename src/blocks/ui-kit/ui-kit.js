import '@blocks/rate/rate.js'

$('.nav__item').click(function() {
  $('.nav__item').removeClass('nav__item--active')
  $(this).addClass('nav__item--active')
  $('.content').fadeOut()
  const activeBlock = '#' + $(this).data('item')
  $('.content').removeClass('content--active')
  $(activeBlock).fadeIn('slow', function () {
    $(this).css('display', 'flex')
  }).addClass('content--active')
})
