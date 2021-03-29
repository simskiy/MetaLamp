// options {object}
// labels: [n] - название полей

class DropDown {
  constructor (elem, options) {
    this.elem = elem;
    ({
      labels: this.labels = this.Labels || ['спальни', 'кровати', 'ванные комнаты' ],
      show: this.show = this.show || false,
      title: this.title = this.title || 'dropdown',
      note: this.note = this.note || '',
      placeholder: this.placeholder = this.placeholder || '',
      styles: this.styles,
      showBtns: this.showBtns = this.showBtns || true
    } = options);
    this.showClearBtn = 0;
    this.Input = '',
    this.Submit = '',
    this.Clear = ''
  }

  createInputBlock () {
    let inputBlock = document.createElement('div');
    let label = document.createElement('label');
    let input = document.createElement('input');
    const cl = 'text-field';

    let span = document.createElement('span');
    span.classList.add(`${cl}__note`);
    span.textConten = this.note;

    inputBlock.classList.add(`${cl}`);
    label.classList.add(`${cl}__label`);
    label.textContent = this.title;
    input.classList.add(`${cl}__input`, `${cl}__input--drop-down`, `${cl}__input--expand`);
    input.setAttribute('readonly', true);
    input.setAttribute('placeholder', this.placeholder);

    if (this.show) {
      input.classList.add('text-field__input--hover');
    } else {
      input.classList.remove('text-field__input--hover');
    }

    [label, span, input].forEach(item => inputBlock.appendChild(item));
    this.Input = inputBlock;
    return inputBlock;
  }

  createDropList () {
    const dd = 'drop-down';
    let list = document.createElement('ul');
    list.classList.add(`${dd}__list`);
    let dropWrapper = document.createElement('div');
    dropWrapper.classList.add(`${dd}__wrapper`);

    for (let elem of this.labels) {
      let listItem = document.createElement('li');
      let label = document.createElement('span');
      let btnBlock = document.createElement('div');
      let btnAdd = document.createElement('button');
      let btnSub = document.createElement('button');
      let sum = document.createElement('span');
      // listItem.setAttribute('style', this.styles.listItem || '');

      listItem.classList.add(`${dd}__item`);
      label.classList.add(`${dd}__label`);
      label.textContent = this.setSum(elem)[0];

      btnBlock.classList.add(`${dd}__btn-block`);
      btnAdd.classList.add(`${dd}__btn`, `${dd}__btn--add`);
      btnSub.classList.add(`${dd}__btn`, `${dd}__btn--sub`);

      sum.classList.add(`${dd}__sum`);
      sum.textContent = this.setSum(elem)[1];

      this.showClearBtn += +sum.textContent;

      if (this.setSum(elem)[1] == 0) {
        btnSub.classList.add(`${dd}__btn--disable`);
      }

      [btnSub, sum, btnAdd].forEach(item => btnBlock.appendChild(item));
      [label, btnBlock].forEach(elem => listItem.appendChild(elem));

      list.appendChild(listItem);
      if (!this.show) list.setAttribute('style', 'display: none');
    }
    dropWrapper.appendChild(list);
    if (this.showBtns) this.createBtnForm().forEach(item => dropWrapper.appendChild(item));
    return dropWrapper;
  }

  createBtnForm () {
    let btnSubmit = document.createElement('button');
    btnSubmit.classList.add('drop-down__btn-form', 'drop-down__btn-form--submit');
    btnSubmit.textContent = 'Применить';
    let btnClear = document.createElement('button');
    btnClear.classList.add('drop-down__btn-form', 'drop-down__btn-form--clear');
    btnClear.textContent = 'Очистить';
    this.Clear = btnClear;
    this.Submit = btnSubmit;
    return [btnClear, btnSubmit];
  }

  createDropDown () {
    let root = document.querySelector(this.elem);
    root.classList.add('drop-down');
    [this.createInputBlock(), this.createDropList()].forEach(item => root.appendChild(item));
  }

  setSum (elem) {
    if (Array.isArray(elem)) {
      return elem;
    } else {
      return [elem, 0];
    }
  }

  inputEvent () {
    $(`${this.elem} .text-field__input`).click( () => {
      $(`${this.elem} .drop-down__wrapper`).slideToggle();
      $(`${this.elem} .text-field__input`).toggleClass('text-field__input--hover');
    })
  }

  btnEvent () {
    let btnsAdd = document.querySelectorAll(`${this.elem} .drop-down__btn--add`);
    let btnsSub = document.querySelectorAll(`${this.elem} .drop-down__btn--sub`);

    for (let btn of btnsSub) {
      btn.addEventListener('click', (e) => {
        let span = e.target.nextSibling;
        this.showClearBtn--;
        span.textContent--;
        if (+span.textContent < 1) {
          span.textContent = 0;
          e.target.classList.add('drop-down__btn--disable');
        }
        if (this.showBtns) this.setClearBtn(this.showClearBtn);
      })
    }

    for (let btn of btnsAdd) {
      btn.addEventListener('click', (e) => {
        let span = e.target.previousSibling;
        e.target.parentElement.firstElementChild.classList.remove('drop-down__btn--disable');
        span.textContent++;
        this.showClearBtn++;
        if (this.showBtns) this.setClearBtn(this.showClearBtn);
      })
    }
  }

  setStyles () {
    console.log(this.styles);
  }

  setClearBtn (num) {
    if (+num > 0) {
      this.Clear.setAttribute('style', 'display: block');
    } else {
      this.Clear.setAttribute('style', 'display: none');
    }
  }

  init () {
    this.createDropDown();
    this.inputEvent();
    this.btnEvent();
    this.setStyles();
  }
}

let drop = new DropDown('#drop-down', {
  labels: [['взрослые', 2], ['дети', 1], 'младенцы'],
  show: true,
  note: 'default/hover',
  showBtns: true,
  styles: {
    input: 'padding: 12px; color: black;'
  }
});

drop.init()
