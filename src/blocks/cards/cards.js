import '@blocks/searchRoom/searchRoom.js'
import '@blocks/roomDetail/roomDetail.js'
import '@blocks/room/room.js'

import Slider from '@/js/lib/slider.js';
import Rate from '@/js/lib/rate.js';
import createCalendar from '@/js/lib/calendar.js';

import '@blocks/cards/cards.scss';

import '@blocks/headerUI/headerUI.js';
import '@blocks/calendar/calendar.js';
import '@blocks/searchRoom/searchRoom.js';
import '@blocks/reg/reg.js';
import '@blocks/loginForm/loginForm.js';

let cardSlider1 = new Slider('#slider-1')
cardSlider1.init()

let cardSlider2 = new Slider('#slider-2')
cardSlider2.init()

let cardRate1 = new Rate('#cardRate-1', {
  edit: true,
})
cardRate1.init()

let cardRate2 = new Rate('#cardRate-2', {
  edit: false
})
cardRate2.init()

createCalendar('#calendar-1', false)

let calendar1 = document.querySelector('#calendar-1 .datepicker__submit')

calendar1.addEventListener('click', (e) => {
  e.stopPropagation();
})
