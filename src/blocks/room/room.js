import Slider from '@/js/lib/slider.js'
import Rate from '@/js/lib/rate.js';

let cardSlider1 = new Slider('#slider-1')
cardSlider1.init()

let cardSlider2 = new Slider('#slider-2')
cardSlider2.init()

let cardRate1 = new Rate('#cardRate-1', {
  edit: false,
})
cardRate1.init()

let cardRate2 = new Rate('#cardRate-2', {
  edit: false
})
cardRate2.init()
