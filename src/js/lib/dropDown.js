// options {object}
//  styles {
//    inputWrapper: ,
//    title: ,
//    input: ,
//    note: ,
//    dropdownWrapper: ,
//    dropdownList: ,
//    dropdownItems: ,
//    dropdownBtns: ,
//    btnSubmit: ,
//    btnClear:
//    }
//  labels: [['взрослые', 2], ['дети', 1], 'младенцы'],
//  minimize: (true || false),
//  note: (string),
//  showBtns: (false || true),
//  preset: ('room' || 'guest'),

export default class {
  constructor (elem, options) {
    this.elem = elem;
    ({
      labels: this.labels = this.Labels || ['спальни', 'кровати', 'ванные комнаты' ],
      minimize: this.minimize = this.minimize || false,
      title: this.title = this.title || 'dropdown',
      note: this.note = this.note || '',
      placeholder: this.placeholder = this.placeholder || '',
      styles: this.styles,
      showBtns: this.showBtns = this.showBtns || true,
      preset: this.preset = this.preset || 'guest'
    } = options);

    this.elements = {
      inputWrapper: document.createElement('div'),
      title: document.createElement('label'),
      input: document.createElement('input'),
      note: document.createElement('span'),
      dropdownWrapper: document.createElement('div'),
      dropdown: document.createElement('ul'),
      btnSubmit: this.showBtns ? document.createElement('button') : '',
      btnClear: this.showBtns ? document.createElement('button') : ''
    };

    this.showClearBtn = 0;
  }

  createInputBlock () {
    const cl = 'text-field';
    this.elements.note.classList.add(`${cl}__note`);
    this.elements.note.textContent = this.note;
    this.elements.inputWrapper.classList.add(`${cl}`);
    this.elements.title.classList.add(`${cl}__label`);
    this.elements.title.textContent = this.title;
    this.elements.input.classList.add(`${cl}__input`, `${cl}__input--drop-down`, `${cl}__input--expand`);
    this.elements.input.setAttribute('readonly', true);
    this.elements.input.setAttribute('placeholder', this.placeholder);

    this.setState('showDrop');

    [this.elements.title, this.elements.note, this.elements.input].forEach(item => this.elements.inputWrapper.appendChild(item));
    return this.elements.inputWrapper;
  }

  createDropList () {
    const dd = 'drop-down';
    this.elements.dropdown.classList.add(`${dd}__list`);
    this.elements.dropdownWrapper.classList.add(`${dd}__wrapper`);

    // генерация списка кнопок
    for (let elem of this.labels) {
      let listItem = document.createElement('li');
      let label = document.createElement('span');
      let btnBlock = document.createElement('div');
      let btnAdd = document.createElement('button');
      let btnSub = document.createElement('button');
      let sum = document.createElement('span');

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

      this.elements.dropdown.appendChild(listItem);
      this.setState('isMinimize');
    }

    this.setPlaceholder();
    this.elements.dropdownWrapper.appendChild(this.elements.dropdown);
    if (this.showBtns) this.createBtnForm().forEach(item => this.elements.dropdownWrapper.appendChild(item));
    return this.elements.dropdownWrapper;
  }

  createBtnForm () {
    this.elements.btnSubmit.classList.add('drop-down__btn-form', 'drop-down__btn-form--submit');
    this.elements.btnSubmit.textContent = 'Применить';
    this.elements.btnClear.classList.add('drop-down__btn-form', 'drop-down__btn-form--clear');
    this.elements.btnClear.textContent = 'Очистить';
    return [this.elements.btnClear, this.elements.btnSubmit];
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
    this.elements.dropdown.addEventListener('click', (e) => {
      if (e.target.classList.contains('drop-down__btn--sub')) {
        let span = e.target.nextSibling;
        if (+span.textContent > 0) {
          this.showClearBtn--;
          span.textContent--;
        }
        if (+span.textContent == 0) e.target.classList.add('drop-down__btn--disable');
      }

      if (e.target.classList.contains('drop-down__btn--add')) {
        let span = e.target.previousSibling;
        e.target.parentElement.firstElementChild.classList.remove('drop-down__btn--disable');
        span.textContent++;
        this.showClearBtn++;
      }
      if (this.showBtns) this.setClearBtn(this.showClearBtn);
      this.setPlaceholder();
    })

    if (this.elements.btnClear) {
      this.elements.btnClear.addEventListener('click', () => {
        for (let item of this.elements.dropdown.children) {
          item.lastElementChild.childNodes[1].textContent = 0; //значение
        }
        this.showClearBtn = 0;
        this.setPlaceholder();
        console.log(this.showClearBtn);
      })
    }
  }

  setStyles () {
    const stylesArr = {
      inputWrapper: [this.elements.inputWrapper],
      title: [this.elements.title],
      input: [this.elements.input],
      note: [this.elements.note],
      dropdownWrapper: [this.elements.dropdownWrapper] || '',
      dropdownList: [this.dropdown],
      dropdownItems: document.querySelectorAll('.drop-down__item'),
      dropdownBtns: document.querySelectorAll('.drop-down__btn'),
      btnSubmit: [this.btnSubmit],
      btnClear: [this.btnClear]
    }
    for (let elem in stylesArr) {
      stylesArr[elem].forEach(item => {
        if (item) {
          item.setAttribute('style', this.styles[elem])
        }
      })
    }
  }

  setClearBtn (num) {
    if (+num > 0) {
      $(this.elements.btnClear).fadeIn();
    } else {
      $(this.elements.btnClear).fadeOut();
    }
  }

  setState (attr) {
    switch (attr) {
      case 'showDrop': {
          if (!this.minimize) {
          this.elements.input.classList.add('text-field__input--hover');
        } else {
          this.elements.input.classList.remove('text-field__input--hover');
        }
      }
      break;

      case 'isMinimize': if (this.minimize) {
        this.elements.dropdownWrapper.setAttribute('style', 'display: none');
      }
      break;
    }
  }

  setPlaceholder() {
    function enumerate (num, dec) {
    if (num > 100) num = num % 100;
    if (num <= 20 && num >= 10) return dec[2];
    if (num > 20) num = num % 10;
    return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2];
    }

    if (this.preset == 'guest') {
      let count = this.showClearBtn;
      this.elements.input.placeholder = 'Сколько гостей';
      if (count == 0) {
        this.elements.input.placeholder = 'Сколько гостей';
      } else {
        this.elements.input.placeholder = `${count} ${enumerate(count, ["гость", "гостя", "гостей"])}`;
      }
    }

    if (this.preset == 'room') {
      this.elements.input.placeholder = '';
      for (let item of this.elements.dropdown.children) {
        let name = item.firstElementChild.textContent; //наименование
        let sum = item.lastElementChild.childNodes[1].textContent; //значение
        if (sum > 0) {
          this.elements.input.placeholder += `${sum} ${name}, `;
        }
      }
    }
  }

  init () {
    this.createDropDown();
    this.inputEvent();
    this.btnEvent();
    // this.setStyles();
  }
}
