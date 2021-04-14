import DropDown from '@/js/lib/dropDown.js';

let roomDetailDropDown = new DropDown('#roomDetail', {
  labels: [['взрослые', 2], ['дети', 1], ['младенцы', 0]],
  minimize: true,
  preset: 'guest',
  title: 'Гости'
})

roomDetailDropDown.init();
