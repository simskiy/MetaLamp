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
      placeholder: this.placeholder = this.placeholder || ''
    } = options);
  }

  createInputBlock () {
    let inputBlock = document.createElement('div');
    let label = document.createElement('label');
    let input = document.createElement('input');
    const cl = 'text-field';

    let span = document.createElement('span');
    span.classList.add(`${cl}__note`);
    span.innerText = this.note;

    inputBlock.classList.add(`${cl}`);
    label.classList.add(`${cl}__label`);
    label.innerText = this.title;
    input.classList.add(`${cl}__input`, `${cl}__input--drop-down`, `${cl}__input--expand`);
    input.setAttribute('readonly', true);

    [label, span, input].forEach(item => inputBlock.appendChild(item));
    return inputBlock;
  }

  createDropList () {
    const dd = 'drop-down';
    let list = document.createElement('ul');
    list.classList.add(`${dd}__list`)

    for (let elem of this.labels) {
      let listItem = document.createElement('li');
      let label = document.createElement('span');
      let btnBlock = document.createElement('div');
      let btnAdd = document.createElement('button');
      let btnSub = document.createElement('button');
      let sum = document.createElement('span');

      listItem.classList.add(`${dd}__item`);
      label.classList.add(`${dd}__label`);
      label.innerText = this.setSum(elem)[0];

      btnBlock.classList.add(`${dd}__btn-block`);
      btnAdd.classList.add(`${dd}__btn`, `${dd}__btn--add`);
      btnSub.classList.add(`${dd}__btn`, `${dd}__btn--sub`);

      sum.classList.add(`${dd}__sum`);
      sum.innerText = this.setSum(elem)[1];

      if (this.setSum(elem)[1] == 0) {
        btnSub.classList.add(`${dd}__btn--disable`);
      }

      [btnSub, sum, btnAdd].forEach(item => btnBlock.appendChild(item));
      [label, btnBlock].forEach(elem => listItem.appendChild(elem));
      list.appendChild(listItem);
      if (!this.show) list.setAttribute('style', 'display: none');
    }
    return list
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
      $(`${this.elem} .drop-down__list`).slideToggle();
    })
  }

  btnEvent () {

  }

  init () {
    this.createDropDown();
    this.inputEvent();
    this.btnEvent();
  }
}

let drop = new DropDown('#drop-down', {
  labels: [['ночные горшки', 2], 'вазы', ['привет, мудила', 5]],
  show: true,
  note: 'default/hover'
});

drop.init()
