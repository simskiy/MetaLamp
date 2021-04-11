import DropDown from '@/js/lib/dropDown.js';

let searchRoomDropDown = new DropDown('#searchRoom__drop-down', {
  labels: [['взрослые', 0], ['дети', 0], ['младенцы', 0]],
  title: 'гости',
  preset: 'guest',
  minimize: true,
})

searchRoomDropDown.init();
