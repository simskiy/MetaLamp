import JSR from 'mm-jsr'

  let {a, b, min, max, step} = $('.dblSlider').data()

  const range = new JSR(['#jsr-1-1', '#jsr-1-2'], {
    sliders: 2,
    min: min || 0,
    max: max || 100,
    values: [a, b],
    grid: false,
    step: step,
    modules: {
        labels: false
    }
  });

  function formatString(str) {
    return str.toLocaleString('ru') + '₽'
  }

  $('#dblSlider__label-1').html(formatString(a))
  $('#dblSlider__label-2').html(formatString(b))

  range.addEventListener('update', (input, value) => {
    if (input.id == 'jsr-1-1') $('#dblSlider__label-1').html(formatString(value))
    if (input.id == 'jsr-1-2') $('#dblSlider__label-2').html(formatString(value))
  });
