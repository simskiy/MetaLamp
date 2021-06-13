import '@blocks/rate/rate.scss'

export default class {
  constructor (elem, options) {
    this.elem = elem;
    ({
      // rate: this.rate = 4,
      edit: this.edit = false,
      starNum: this.starNum = 5,
      color: this.color = '#fff',
      name: this.name = 'rating'
    } = options);

    this.starImg = `<svg width="21" height="20" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.2637 13.9209L14.0137 16.1709L13.0293 11.9053L16.3574 8.99902L11.9512 8.62402L10.2637 4.59277L8.57617 8.62402L4.16992 8.99902L7.49805 11.9053L6.51367 16.1709L10.2637 13.9209ZM20.248 7.7334L14.8105 12.4678L16.4512 19.499L10.2637 15.749L4.07617 19.499L5.7168 12.4678L0.279297 7.7334L7.45117 7.12402L10.2637 0.514648L13.0762 7.12402L20.248 7.7334Z" fill="url(#paint0_linear)"/>
    <defs>
    <linearGradient id="paint0_linear" x1="10.2637" y1="-1.50098" x2="10.2637" y2="22.499" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#BC9CFF"/>
    <stop offset="100%" stop-color="#8BA4F9"/>
    </linearGradient>
    </defs>
    </svg>`;

    this.rate = '';
  }

  create () {
    let root = document.querySelector(this.elem);
    root.classList.add('rating');

    this.rate = root.dataset.rate;

    // root.setAttribute('data-rate', this.rate);

    if (this.edit) root.classList.add('rating__set');

    let progress = document.createElement('div');
    progress.classList.add('rating__progress');
    progress.style.backgroundColor=this.color;

    let items = document.createElement('div');
    items.classList.add('rating__items')

    for (let i = 0; i < this.starNum; i++) {
      let label = document.createElement('label');
      label.classList.add('rating__star');
      label.setAttribute('for', `star-${i}`);
      label.innerHTML = this.starImg;

      let input = document.createElement('input');
      input.classList.add('rating__item');
      input.setAttribute('id', `star-${i}`);
      input.setAttribute('type', 'radio');
      input.setAttribute('name', this.name);
      input.setAttribute('value', i + 1);
      if (this.edit) input.classList.add('rating__item--edit');

      label.appendChild(input);
      items.appendChild(label);
    }
    root.appendChild(progress)
    root.appendChild(items)
  }

  checkStar() {
    let stars = document.querySelectorAll(`${this.elem} .rating__item`)
    let progress = document.querySelector(`${this.elem} .rating__progress`)

    for (let star of stars) {
      star.addEventListener('click', (e) => {
        progress.style.width = `${e.target.value / 0.05}%`
      })
    }
  }

  init () {
    this.create();
    document.querySelector(`${this.elem} .rating__progress`).style.width = `${this.rate / 0.05}%`

    if (document.querySelector(this.elem).classList.contains('rating__set')) {
      this.checkStar()
    }
  }
}
