$('.nav__item').click(function() {
  $('.nav__item').removeClass('nav__item--active')
  $(this).addClass('nav__item--active')
  $('.content').removeClass('content--active')
  const activeBlock = '#' + $(this).data('item')
  $(activeBlock).addClass('content--active')
})
