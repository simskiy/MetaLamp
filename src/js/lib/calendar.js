import 'air-datepicker'

require('air-datepicker/dist/css/datepicker.min.css')

function setMaket (id) {
  if ($(id).data('maket') == 'maket') {
  let datepicker = $(id).datepicker().data('datepicker');
  datepicker.selectedDates = [new Date('2019-8-19'), new Date('2019-8-23')]
  datepicker.date = new Date('2019-8')
  $(id).datepicker({
    onRenderCell: function(date, cellType) {
      if (cellType == 'day' && date.getDate() == 8) {
        return {
          classes: '-current-'
        }
      }
      if (cellType == 'day' && (date.getDate() > 19 & date.getDate() < 23)) {
        return {
          classes: '-in-range-'
        }
      }
      if (cellType == 'day' && date.getDate() == 19) {
        return {
          classes: '-range-from-'
        }
      }
      if (cellType == 'day' && date.getDate() == 23) {
        return {
          classes: '-range-to-'
        }
      }
    }
  })
 }
}

export default function (id='#calendar', minDate = new Date()) {
  let calendar = $(id).datepicker({
    clearButton: true,
    navTitles: {
      days: 'MM <i>yyyy</i>',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
    },
    classes: 'calendar',
    prevHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
    nextHtml: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none"><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
    multipleDates: '3',
    range: true,
    minDate: minDate
  })

  $(`${id} .datepicker--buttons`).append('<span class="datepicker--button datepicker__submit">Применить</span>')

  setMaket(id)

  return calendar
}
