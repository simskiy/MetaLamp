import DropDown from '@/js/lib/dropDown.js';
import createCalendar from '@/js/lib/calendar.js';
import '@blocks/calendar/calendar.js';

let searchRoomDropDown = new DropDown('#searchRoom__drop-down', {
  labels: [['взрослые', 0], ['дети', 0], ['младенцы', 0]],
  title: 'гости',
  preset: 'guest',
  minimize: true,
})

searchRoomDropDown.init();

createCalendar();
