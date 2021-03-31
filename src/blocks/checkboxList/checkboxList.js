$('.checkboxList__title[data-expand]').click(function () {
  let attr = $(this).attr('data-expand');
  if (attr == 'on') {
    $(this).attr('data-expand', 'off')
  } else {
    $(this).attr('data-expand', 'on')
  }
  $(this).next().slideToggle();
})
