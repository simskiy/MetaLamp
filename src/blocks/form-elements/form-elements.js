import '@blocks/dblSlider/dblSlider.js'
import '@blocks/checkboxList/checkboxList.js'
import '@blocks/pagination/pagination.js'

import DropDown from '@/js/lib/dropDown.js';
import Rate from '@/js/lib/rate.js';

let drop1 = new DropDown('#drop-down-1', {
  labels: [['спальни', 2], ['кровати', 2], ['ванные комнаты', 0]],
  minimize: true,
  note: 'default',
  preset: 'room'
});

let drop2=new DropDown('#drop-down-2', {
  labels: [['спальни', 2], ['кровати', 2], ['ванные комнаты', 0]],
  minimize: false,
  note: 'expanded',
  preset: 'room',
  showBtns: false
})

let drop3 = new DropDown('#drop-down-3', {
  labels: [['взрослые', 0], ['дети', 0], ['младенцы', 0]],
  minimize: false,
  preset: 'guest'
})

let drop4 = new DropDown('#drop-down-4', {
  labels: [['взрослые', 2], ['дети', 1], ['младенцы', 0]],
  minimize: false,
  preset: 'guest'
})

drop1.init()
drop2.init()
drop3.init()
drop4.init()


let rate1 = new Rate('#rate-1', {
  rate: 4
})

let rate2 = new Rate('#rate-2', {
  rate: 5
})

rate1.init()
rate2.init()
