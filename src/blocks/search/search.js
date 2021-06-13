import '@blocks/search/search.scss'

import '@/js/header.js'
import '@blocks/header/header.js'
import '@blocks/dblSlider/dblSlider.js'
import '@blocks/checkboxList/checkboxList.js'
import '@blocks/pagination/pagination.js'

import DropDown from '@/js/lib/dropDown.js'
import Slider from '@/js/lib/slider.js'
import Rate from '@/js/lib/rate.js'

import '@blocks/header/header.js';
import '@blocks/footer/footer.js';

import '@blocks/dblSlider/dblSlider.js';
import '@blocks/checkboxList/checkboxList.js';
import '@blocks/checkboxRich/checkboxRich.js';
import '@blocks/pagination/pagination.js';
import '@blocks/room/room.js';

let filterGuest = new DropDown('#filterDropGuest', {
  labels: [['взрослые', 0], ['дети', 0], ['младенцы', 0]],
  minimize: true,
  preset: 'guest',
  title: 'Гости'
})

let filterComfort = new DropDown('#filterDropComfort', {
  labels: [['спальни', 2], ['кровати', 2], ['ванные комнаты', 0]],
  minimize: true,
  preset: 'room',
  showBtns: false,
  title: 'Удобства номера'
})

filterGuest.init()
filterComfort.init()

let rooms = document.querySelectorAll('.rooms__item')
for (let i = 1; i < rooms.length + 1; i++) {
  new Slider(`#slider-${i}`).init()
  new Rate(`#cardRate-${i}`, {
    edit: false
  }).init()
}
