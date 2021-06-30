import '@blocks/diagram/diagram.scss'


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
    let pi = Math.PI
	  return degrees * pi / 180
  }

  getRadius() {
    return this.width > this.height ? this.height/2 : this.width/2
  }

  getDegrees (radian) {
    let pi = Math.PI
    return radian * 180/pi
  }

  getCoord(arr) {
    let coord = []
    if (arr) {
      for (let elem of arr) {
        let a = this.getRadians(elem).toFixed(5)
        let r = this.getRadius()
        coord.push((Math.cos(a).toFixed(5) * r) + r )
        coord.push(-(Math.sin(a).toFixed(5) * r) + r)
      }
    }
    return coord
  }

  getDataDiagram () {
    let sumVote = Object.values(this.votes).reduce((acc, cur) => +acc + +cur)
    let angles = [270 + this.indent / 2]
    let dataDiagramArr = []
    let rate = ['great', 'good', 'satis', 'bad']
    let colors = {great: ['#ffba9c', '#ffe39c'], good: ['#66d2ea', '#6fcf97'], satis: ['#8BA4F9', '#BC9CFF'], bad: ['#3D4975', '#909090']}
    let voteValues = Object.values(this.votes)

    for (let i = 0; i < Object.keys(this.votes).length; i++) {
      let percent = voteValues[i] * 100 / sumVote
      let deg = 360 * percent / 100
      angles.push((angles[i] - deg) % 360)
    }

    for (let i = 0; i < angles.length - 1; i++) {
      let obj = {}
      if (angles[i] != angles[i + 1]) {
        obj.position = [angles[i] - this.indent / 2, angles[i + 1] + this.indent / 2]

      } else {
        obj.position = false
      }
      obj.rate = rate[i]
      obj.value = voteValues[i]
      obj.color = colors[obj.rate]
      obj.coord = this.getCoord(obj.position)
      dataDiagramArr.push(obj)
    }
    console.log(dataDiagramArr)
    return dataDiagramArr
  }

  draw () {
    let x = this.width/2
    let y = this.height/2
    let r = this.getRadius() - this.line

    for (let elem of this.getDataDiagram()) {
      if (elem.position) {
        let a = this.getRadians(elem.position[0])
        let b = this.getRadians(elem.position[1])
        let x1 = elem.coord[0]
        let y1 = elem.coord[1]
        let x2 = elem.coord[2]
        let y2 = elem.coord[3]
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, a, b, true)
        let gradient =this.ctx.createLinearGradient(x1, y1, x2, y2)
        gradient.addColorStop(0, elem.color[0])
        gradient.addColorStop(1, elem.color[1])
        this.ctx.strokeStyle = gradient
        this.ctx.stroke()
      }
    }
  }
}
