export default class {
  constructor (elem) {
    this.canvas = document.getElementById(elem)
    this.ctx = this.canvas.getContext('2d')
    this.line = 4
    this.indent = 2
    this.ctx.lineWidth = this.line
    this.height = this.canvas.clientHeight
    this.width = this.canvas.clientWidth
    this.votes = this.canvas.dataset
  }

  getRadians(degrees) {
	  return (Math.PI/180)*degrees;
  }

  getRadius() {
    return this.width > this.height ? this.height/2 : this.width/2
  }

  getDegrees (radian) {
    let pi = Math.PI
    return radian * (180/pi)
  }

  getAnglesArr () {
    let sumVote = Object.values(this.votes).reduce((acc, cur) => +acc + +cur)
    let angles = [270 + this.indent / 2]
    let anglesArr = []
    let rate = ['great', 'good', 'satis', 'bad']
    let colors = {great: 'orange', good: 'green', satis: 'blue', bad: 'black'}
    let voteValues = Object.values(this.votes)

    for (let i = 0; i < Object.keys(this.votes).length; i++) {
      let percent = voteValues[i] * 100 / sumVote
      let deg = 360 * percent / 100
      angles.push((angles[i] - deg) % 360)
    }

    for (let i = 0; i < angles.length - 1; i++) {
      let obj = {}
      if (angles[i] != angles[i + 1]) {
        obj.coord = [angles[i] - this.indent / 2, angles[i + 1] + this.indent / 2]
      } else {
        obj.coord = false
      }
      obj.rate = rate[i]
      obj.value = voteValues[i]
      obj.color = colors[obj.rate]
      anglesArr.push(obj)
    }
    return anglesArr
  }

  draw () {
    let x = this.width/2
    let y = this.height/2
    let r = this.getRadius() - this.line
    console.log(this.getAnglesArr())

    for (let elem of this.getAnglesArr()) {
      if (elem.coord) {
        let a = this.getRadians(elem.coord[0])
        let b = this.getRadians(elem.coord[1])
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, a, b, true)
        this.ctx.strokeStyle = elem.color
        this.ctx.stroke()
        console.log(elem.color)
      }
    }

    // let coord = this.calcDegrees()

    // console.log(`radius: ${this.getRadius()}`)
    // console.log(coord)

    // for (let i = 1; i < coord.length; i += 2) {
    //   let a = this.getRadians(coord[i])
    //   let b = this.getRadians(coord[i + 1])

    //   if (coord[i] != coord[i + 1]) {
    //     this.ctx.beginPath()
    //     this.ctx.arc(x, y, r, a, b, false)
    //     this.ctx.strokeStyle = colors[i]
    //     this.ctx.stroke()

    //     console.log(`radX: ${a}, radY: ${b}`)
    //     console.log(`x: ${this.getDegrees(a)}, y: ${this.getDegrees(b)}`)
    //   }
    // }
  }
}
