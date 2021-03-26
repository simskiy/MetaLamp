import 'cleave.js'

let inputDate = document.querySelector('.text-field__input[data-input="date"]')

if (inputDate) {
  new Cleave('.text-field__input[data-input="date"]', {
    date: true,
    delimiter: '-',
    datePattern: ['d', 'm', 'Y']
  });
}
