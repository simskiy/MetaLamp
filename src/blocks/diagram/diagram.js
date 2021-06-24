export default class {
  constructor (elem) {
    this.canvas = document.getElementById(elem)
    this.ctx = this.canvas.getContext('2d')
    this.line = 5
    this.ctx.lineWidth = this.line
    this.height = this.canvas.clientHeight
    this.width = this.canvas.clientWidth
    this.vote = [
      this.canvas.dataset.bad,
      this.canvas.dataset.satis,
      this.canvas.dataset.good,
      this.canvas.dataset.great
    ]
  }

  getRadians(degrees) {
	  return (Math.PI/180)*degrees;
  }

  getRadius() {
    return this.width > this.height ? this.height/2 : this.width/2
  }

  calc () {
    let sumVote = this.vote.reduce((acc, cur) => +acc + +cur)
    let coord = [271]
    for (let i = 0; i < this.vote.length; i++) {
      let percent = this.vote[i] * 100 / sumVote
      let deg = 360 * percent / 100
      coord.push((coord[i] + deg) % 360)
    }
    return coord
  }

  draw () {
    let x = this.width/2
    let y = this.height/2
    let r = this.getRadius() - this.line
    let colors = ['black', 'blue', 'green', 'orange']
    let coord = this.calc()
    for (let i = 1; i < coord.length; i++) {
      if (coord[i - 1] != coord[i]) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, this.getRadians(coord[i - 1] + 2), this.getRadians(coord[i] - 2), false)
        this.ctx.strokeStyle = colors[i - 1]
        this.ctx.stroke()
      }
    }
  }
}
