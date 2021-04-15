class Slider {
  constructor (elem) {
    this.elem = elem
    this.btnNext = document.querySelector(`${elem} .slider__btn--next`)
    this.btnPrev = document.querySelector(`${elem} .slider__btn--prev`)
    this.sliderTrack = document.querySelector(`${elem} .slider__track`)
    this.slides = document.querySelectorAll(`${elem} .slider__slide`)
    this.slideWidth = this.slides[0].offsetWidth
    this.slideIndex = 0
    this.indicators = document.querySelector(`${elem} .indicator`)
  }

  slide () {
    this.sliderTrack.style.transition = 'transform .5s';
    this.lockBtn()
    this.btnNext.addEventListener('click', this.nextSlide.bind(this))
    this.btnPrev.addEventListener('click', this.prevSlide.bind(this))
  }

  nextSlide () {
    this.slideIndex = this.slideIndex + 1
    this.lockBtn()
    this.toggleSlide()
    this.toggleIndicator()
  }

  prevSlide () {
    this.slideIndex = this.slideIndex - 1
    this.lockBtn()
    this.toggleSlide()
    this.toggleIndicator()
  }

  lockBtn () {
    this.btnPrev.classList.toggle('slider__btn--disabled', this.slideIndex == 0);
    this.btnNext.classList.toggle('slider__btn--disabled', this.slideIndex == this.slides.length - 1);
  }

  toggleSlide () {
    this.sliderTrack.style.transform = `translate3d(-${this.slideIndex * this.slideWidth}px, 0px, 0px)`
  }

  toggleIndicator () {
    for (let indicator of this.indicators.children) {
      indicator.classList.remove('indicator__item--current')
    }
    this.indicators.children[this.slideIndex].classList.add('indicator__item--current')
  }
}

let slider1 = new Slider('#slider-1')
let slider2 = new Slider('#slider-2')
slider1.slide()
slider2.slide()
