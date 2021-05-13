import DropDown from '@/js/lib/dropDown.js';
import createCalendar from '@/js/lib/calendar.js';
// import '@blocks/calendar/calendar.js';

let searchRoomDropDown = new DropDown('#searchRoom__drop-down', {
  labels: [['взрослые', 0], ['дети', 0], ['младенцы', 0]],
  title: 'гости',
  preset: 'guest',
  minimize: true,
})

searchRoomDropDown.init();

let datepicker = createCalendar().data('datepicker');

let checkout = document.querySelector('.searchRoom__check-out input');
let checkin = document.querySelector('.searchRoom__check-in input');
let submit = document.querySelector('#calendar .datepicker__submit');

function showCalendar () {
  calendar.classList.toggle('searchRoom__calendar--show')
}

checkout.addEventListener('click', showCalendar);
checkin.addEventListener('click', showCalendar);

submit.addEventListener('click', (e) => {
  e.stopPropagation();
  showCalendar();
  let dates = datepicker.selectedDates;
  checkin.value = ("0" + dates[0].getDate()).slice(-2) + "." + ("0"+(dates[0].getMonth()+1)).slice(-2) + "." + dates[0].getFullYear();
  checkout.value = ("0" + dates[1].getDate()).slice(-2) + "." + ("0"+(dates[1].getMonth()+1)).slice(-2) + "." + dates[1].getFullYear();
})
