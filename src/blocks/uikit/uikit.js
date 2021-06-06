import '@/js/header.js'
import '@blocks/formElements/formElements.js'
import '@blocks/cards/cards.js'
import '@blocks/headersFooters/headersFooters.js'

require('@blocks/uikit/uikit.scss')


$('.nav__item').click(function() {
  $('.nav__item').removeClass('nav__item--active')
  $(this).addClass('nav__item--active')
  $('.content').fadeOut()
  const activeBlock = '#' + $(this).data('item')
  $('.content').removeClass('content--active')
  $(activeBlock).fadeIn('slow', function () {
    $(this).css('display', 'flex')
  }).addClass('content--active')

  if ($(this).data('item') == 'block-3' || $(this).data('item') == 'block-4') {
    $('.container').addClass('container--grey')
  } else {
    $('.container').removeClass('container--grey')
  }
})
