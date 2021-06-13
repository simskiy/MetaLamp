import DropDown from '@/js/lib/dropDown.js';

import '@blocks/roomDetail/roomDetail.scss';

import '@blocks/textField/textField.js';
import '@blocks/btn/btn.js';

if (document.querySelector('.roomDetail')) {
  let roomDetailDropDown = new DropDown('#roomDetail', {
    labels: [['взрослые', 2], ['дети', 1], ['младенцы', 0]],
    minimize: true,
    preset: 'guest',
    title: 'Гости'
  })

  roomDetailDropDown.init();
}
