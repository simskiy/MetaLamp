import 'cleave.js'

let inputDate = document.querySelectorAll('.text-field__input--date')

if (inputDate) {
  $(inputDate).each(function () {
    new Cleave(this, {
      date: true,
      delimiter: '-',
      datePattern: ['d', 'm', 'Y']
    });
  })
}
