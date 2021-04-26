export default class {
  constructor (elem) {
    this.elem = elem
    this.btnNext = document.querySelector(`${elem} .slider__btn--next`)
    this.btnPrev = document.querySelector(`${elem} .slider__btn--prev`)
    this.sliderTrack = document.querySelector(`${elem} .slider__track`)
    this.slides = document.querySelectorAll(`${elem} .slider__slide`)
    this.slideIndex = 0
    this.indicators = document.querySelector(`${elem} .indicator`)
  }

  init () {
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

    this.btnNext.disabled = this.btnNext.classList.contains('slider__btn--disabled')
    this.btnPrev.disabled = this.btnPrev.classList.contains('slider__btn--disabled')
  }

  toggleSlide () {
    this.sliderTrack.style.transform = `translate3d(-${this.slideIndex * this.slides[0].offsetWidth}px, 0px, 0px)`
  }

  toggleIndicator () {
    for (let indicator of this.indicators.children) {
      indicator.classList.remove('indicator__item--current')
    }
    this.indicators.children[this.slideIndex].classList.add('indicator__item--current')
  }
}
