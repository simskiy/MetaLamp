import JSR from 'mm-jsr'

const {a, b, min, max} = $('.dblSlider').data()


new JSR(['#jsr-1-1', '#jsr-1-2'], {
    sliders: 2,
    min: min,
    max: max,
    values: [a, b],
    grid: false
});
