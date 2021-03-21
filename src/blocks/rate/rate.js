const rate = $('.rating').data('rate')
$('.rating__progress').css('width', rate / 0.05 + '%')

if ($('.rating').hasClass('rating__set')) {
  $('.rating__item').click(function () {
    $('.rating__progress').css('width', $(this).val() / 0.05 + '%')
  })
}
