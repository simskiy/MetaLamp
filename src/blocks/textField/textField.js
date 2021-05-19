import 'cleave.js'

let inputDate = document.querySelectorAll('.text-field__input--date')

$(inputDate).each(function () {
  new Cleave(this, {
    date: true,
    delimiter: '-',
    datePattern: ['d', 'm', 'Y']
  });
})
