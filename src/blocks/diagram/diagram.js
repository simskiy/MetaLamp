import '@blocks/diagram/diagram.scss'


export default class {
  constructor (elem) {
    this.canvas = document.getElementById(elem)

    this.diagram = {
      line: 4,
      indent: 3,
      height: this.canvas.clientHeight,
      width: this.canvas.clientWidth,
      votes: this.canvas.dataset
    }

    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineWidth = this.diagram.line
  }

  getRadians(degrees) {
    let pi = Math.PI
	  return degrees * pi / 180
  }

  getRadius() {
    let width = this.diagram.width
    let height = this.diagram.height
    return width > height ? height/2 : width/2
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
        coord.push((Math.cos(a).toFixed(5) * r) + r)
        coord.push(-(Math.sin(a).toFixed(5) * r) + r)
      }
    }
    return coord
  }

  getDataDiagram () {
    let sumVote = Object.values(this.diagram.votes).reduce((acc, cur) => +acc + +cur)
    let angles = [270 + this.diagram.indent / 2]
    let dataDiagramArr = []
    let rate = ['great', 'good', 'satis', 'bad']
    let colors = {great: ['#ffba9c', '#ffe39c'], good: ['#66d2ea', '#6fcf97'], satis: ['#8BA4F9', '#BC9CFF'], bad: ['#3D4975', '#909090']}
    let voteValues = Object.values(this.diagram.votes)
    let votes = this.diagram.votes
    let indent = this.diagram.indent

    for (let i = 0; i < Object.keys(votes).length; i++) {
      let percent = voteValues[i] * 100 / sumVote
      let deg = 360 * percent / 100
      angles.push((angles[i] - deg) % 360)
    }

    for (let i = 0; i < angles.length - 1; i++) {
      let sector = {}
      if (angles[i] != angles[i + 1]) {
        sector.position = [angles[i] - indent / 2, angles[i + 1] + indent / 2]

      } else {
        sector.position = false
      }
      sector.rate = rate[i]
      sector.value = voteValues[i]
      sector.color = colors[sector.rate]
      sector.coord = this.getCoord(sector.position)
      dataDiagramArr.push(sector)
    }
    return dataDiagramArr
  }

  setText(text) {
    let a = text%10
    if (a == 0 || (a > 4 && a < 9)) return 'ГОЛОСОВ'
    if (a == 1) return 'ГОЛОС'
    if (a > 1 || a < 5) return 'ГОЛОСА'
  }

  getText (dataDiagram, x, y) {
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#BC9CFF'
      let text = dataDiagram.reduce((sum, curr) => sum + Number(curr.value), 0)
      this.ctx.font = 'bold 24px "Montserrat"'
      this.ctx.fillText(text, x, y - 2)
      this.ctx.font = 'bold 12px "Montserrat"'
      this.ctx.fillText(this.setText(text), x, y + 17)
  }

  animateSector (coord) {
    let x1 = coord[0]
    let y1 = coord[1]
    let x2 = coord[2]
    let y2 = coord[3]
  }

  draw () {
    let x = this.diagram.width/2
    let y = this.diagram.height/2
    let r = this.getRadius() - this.diagram.line
    let dataDiagram = this.getDataDiagram()

    for (let elem of dataDiagram) {
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
    this.getText(dataDiagram, x, y)
  }
}
