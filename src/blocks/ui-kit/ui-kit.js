
$('.nav__item').click(function() {
  $('.nav__item').removeClass('nav__item--active')
  $(this).addClass('nav__item--active')
  $('.content').fadeOut()
  const activeBlock = '#' + $(this).data('item')
  $(activeBlock).fadeIn().addClass('content--active')
})
