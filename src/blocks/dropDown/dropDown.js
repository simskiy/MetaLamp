import DropDown from '@/js/lib/dropDown.js'

let drop = new DropDown('#drop-down', {
  labels: [['взрослые', 2], ['дети', 1], 'младенцы'],
  minimize: false,
  note: 'default/hover',
  showBtns: false,
  preset: 'room',
  styles: {

  }
});

drop.init()
