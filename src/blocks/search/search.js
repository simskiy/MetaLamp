import '@/js/header.js'
import '@blocks/mainNav/mainNav.js'
import '@blocks/dblSlider/dblSlider.js'
import '@blocks/checkboxList/checkboxList.js'

require('@blocks/search/search.scss')

import DropDown from '@/js/lib/dropDown.js';

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
  showBtns: false
})

filterGuest.init()
filterComfort.init()
