import '@blocks/checkBtn/checkBtn.js';

import '@blocks/checkboxList/checkboxList.scss';

$('.checkboxList__title[data-expand]').click(function () {
  let attr = $(this).attr('data-expand');
  // if (attr == 'on') {
  //   $(this).attr('data-expand', 'off')
  // }
  // if (attr == 'off') {
  //   $(this).attr('data-expand', 'on')
  // }
  switch(attr) {
    case 'on':
      $(this).attr('data-expand', 'off')
      break
    case 'off':
      $(this).attr('data-expand', 'on')
      break
  }
  $(this).next().slideToggle();
})
