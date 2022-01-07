import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import $ from 'jquery'
import './pagesStyle.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount(){
      this.viewCanvas()
  }
  viewCanvas(){
    var canvas = document.getElementById('canvas_bg')
    if(canvas.getContext){
      var ctx = canvas.getContext('2d')
    } else{
      console.log('CANVAS NOT GET CONTEXT!')
    }
    //dot line one
    var x = 150
    var y = window.innerHeight - 100
    var x1 = window.innerWidth * 35 / 100
    var y1 = window.innerHeight - 100
    var x2 = window.innerWidth * 65 / 100
    var y2 = window.innerHeight - 100
    var x3 = window.innerWidth * 85 / 100
    var y3 = window.innerHeight - 100
    //dot line two
    var x4 = 100
    var y4 = window.innerHeight - 150
    var x5 = window.innerWidth * 30 / 100
    var y5 = window.innerHeight - 150
    var x6 = window.innerWidth * 60 / 100
    var y6 = window.innerHeight - 150
    var x7 = window.innerWidth * 90 / 100
    var y7 = window.innerHeight - 150
    //dot line three
    var x8 = 150
    var y8 = window.innerHeight - 180
    var x9 = window.innerWidth * 35 / 100
    var y9 = window.innerHeight - 180
    var x10 = window.innerWidth * 65 / 100
    var y10 = window.innerHeight - 180
    var x11 = window.innerWidth * 85 / 100
    var y11 = window.innerHeight - 180
    //dot line four
    var x12 = 100
    var y12 = window.innerHeight - 200
    var x13 = window.innerWidth * 30 / 100
    var y13 = window.innerHeight - 200
    var x14 = window.innerWidth * 60 / 100
    var y14 = window.innerHeight - 200
    var x15 = window.innerWidth * 90 / 100
    var y15 = window.innerHeight - 200
    //кол-во шагов в одном направлении
    var stepCount = 0
    //направление движения
    var direction
    var timer
    var myX
    var myY
    function drawDot() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if(stepCount === 0) {
        stepCount = Math.floor(10 * Math.random())
        direction = Math.floor(4 * Math.random())
      } else {
        stepCount --
      }
      switch (direction) {
        case 0:
          y = y < window.innerHeight - 75 ? y + 4 : y
          y1 = y1 > window.innerHeight - 125 ? y1 - 4 : y1
          y2 = y2 < window.innerHeight - 75 ? y2 + 4 : y2
          y3 = y3 > window.innerHeight - 125 ? y3 - 4 : y3
          y4 = y4 < window.innerHeight - 125 ? y4 + 3 : y4
          y5 = y5 > window.innerHeight - 175 ? y5 - 3 : y5
          y6 = y6 > window.innerHeight - 175 ? y6 - 3 : y6
          y7 = y7 < window.innerHeight - 125 ? y7 + 3 : y7
          y8 = y8 < window.innerHeight - 160 ? y8 + 2 : y8
          y9 = y9 > window.innerHeight - 200 ? y9 - 2 : y9
          y10 = y10 < window.innerHeight - 160 ? y10 + 2 : y10
          y11 = y11 > window.innerHeight - 200 ? y11 - 2 : y11 
          y12 = y12 < window.innerHeight - 190 ? y12 + 1 : y12
          y13 = y13 > window.innerHeight - 210 ? y13 - 1 : y13
          y14 = y14 > window.innerHeight - 210 ? y14 - 1 : y14
          y15 = y15 < window.innerHeight - 190 ? y15 + 1 : y15
          break
        case 1:
          x = x < window.innerWidth * 15 / 100 ? x + 4 : x
          x1 = x1 > window.innerWidth * 40 / 100 ? x1 - 4 : x1
          x2 = x2 < window.innerWidth * 65 / 100 ? x2 + 4 : x2
          x3 = x3 > window.innerWidth * 85 / 100 ? x3 + 4 : x3
          x4 = x4 > window.innerWidth * 25 / 100 ? x4 - 3 : x4
          x5 = x5 < window.innerWidth * 45 / 100 ? x5 + 3 : x5
          x6 = x6 < window.innerWidth * 65 / 100 ? x6 + 3 : x6
          x7 = x7 > window.innerWidth * 80 / 100 ? x7 - 3 : x7
          x8 = x8 < window.innerWidth * 15 / 100 ? x8 + 2 : x8
          x9 = x9 > window.innerWidth * 45 / 100 ? x9 - 2 : x9
          x10 = x10 < window.innerWidth * 65 / 100 ? x10 + 2 : x10
          x11 = x11 > window.innerWidth * 85 / 100 ? x11 - 2 : x11
          x12 = x12 < window.innerWidth * 20 / 100 ? x12 + 1 : x12
          x13 = x13 > window.innerWidth * 40 / 100 ? x13 - 1 : x13
          x14 = x14 > window.innerWidth * 60 / 100 ? x14 - 1 : x14
          x15 = x15 < window.innerWidth * 90 / 100 ? x15 + 1 : x15
          break
        case 2:
          y = y > window.innerHeight - 125 ? y - 4 : y
          y1 = y1 < window.innerHeight - 75 ? y1 + 4 : y1
          y2 = y2 > window.innerHeight - 125 ? y2 - 4 : y2
          y3 = y3 < window.innerHeight - 75 ? y3 + 4 : y3
          y4 = y4 > window.innerHeight - 175 ? y4 - 3 : y4
          y5 = y5 < window.innerHeight - 125 ? y5 + 3 : y5
          y6 = y6 < window.innerHeight - 125 ? y6 + 3 : y6
          y7 = y7 > window.innerHeight - 175 ? y7 - 3 : y7
          y8 = y8 > window.innerHeight - 200 ? y8 - 2 : y8
          y9 = y9 < window.innerHeight - 160 ? y9 + 2 : y9
          y10 = y10 > window.innerHeight - 200 ? y10 - 2 : y10
          y11 = y11 < window.innerHeight - 160 ? y11 + 2 : y11 
          y12 = y12 > window.innerHeight - 210 ? y12 - 1 : y12
          y13 = y13 < window.innerHeight - 190 ? y13 + 1 : y13
          y14 = y14 < window.innerHeight - 190 ? y14 + 1 : y14
          y15 = y15 > window.innerHeight - 210 ? y15 - 1 : y15
          break
        case 3:
          x = x > window.innerWidth * 5 / 100 ? x - 4 : x
          x1 = x1 < window.innerWidth * 70 / 100 ? x1 + 4 : x1
          x2 = x2 > window.innerWidth * 60 / 100 ? x2 - 4 : x2
          x3 = x3 < window.innerWidth * 90 / 100 ? x3 + 4 : x3
          x4 = x4 < window.innerWidth * 10 / 100 ? x4 + 3 : x4
          x5 = x5 > window.innerWidth * 40 / 100 ? x5 - 3 : x5
          x6 = x6 > window.innerWidth * 60 / 100 ? x6 - 3 : x6
          x7 = x7 < window.innerWidth * 95 / 100 ? x7 + 3 : x7
          x8 = x8 > window.innerWidth * 10 / 100 ? x8 - 2 : x8
          x9 = x9 < window.innerWidth * 35 / 100 ? x9 + 2 : x9
          x10 = x10 > window.innerWidth * 60 / 100 ? x10 - 2 : x10
          x11 = x11 < window.innerWidth * 95 / 100 ? x11 + 2 : x11
          x12 = x12 > window.innerWidth * 10 / 100 ? x12 - 1 : x12
          x13 = x13 < window.innerWidth * 50 / 100 ? x13 + 1 : x13
          x14 = x14 < window.innerWidth * 65 / 100 ? x14 + 1 : x14
          x15 = x15 > window.innerWidth * 80 / 100 ? x15 - 1 : x15
          break
        default:
          break
      }
      if( x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
        stepCount = 0
      }
      ctx.strokeStyle = '#222'
      ctx.fillRect(x - 5, y - 5, 10, 10)
      ctx.fillRect(x1 - 5, y1 - 5, 10, 10)
      ctx.fillRect(x2 - 5, y2 - 5, 10, 10)
      ctx.fillRect(x3 - 5, y3 - 5, 10, 10)
      ctx.fillRect(x4 - 4, y4 - 4, 8, 8)
      ctx.fillRect(x5 - 4, y5 - 4, 8, 8)
      ctx.fillRect(x6 - 4, y6 - 4, 8, 8)
      ctx.fillRect(x7 - 4, y7 - 4, 8, 8)
      ctx.fillRect(x8 - 3, y8 - 3, 6, 6)
      ctx.fillRect(x9 - 3, y9 - 3, 6, 6)
      ctx.fillRect(x10 - 3, y10 - 3, 6, 6)
      ctx.fillRect(x11 - 3, y11 - 3, 6, 6)
      ctx.fillRect(x12 - 2, y12 - 2, 4, 4)
      ctx.fillRect(x13 - 2, y13 - 2, 4, 4)
      ctx.fillRect(x14 - 2, y14 - 2, 4, 4)
      ctx.fillRect(x15 - 2, y15 - 2, 4, 4)
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.moveTo(0, window.innerHeight - 100)
      ctx.lineTo(x, y)
      ctx.lineTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.lineTo(x3, y3)
      ctx.lineTo(window.innerWidth, window.innerHeight - 100)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.moveTo(0, window.innerHeight - 150)
      ctx.lineTo(x4, y4)
      ctx.lineTo(x5, y5)
      ctx.lineTo(x6, y6)
      ctx.lineTo(x7, y7)
      ctx.lineTo(window.innerWidth, window.innerHeight - 150)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.moveTo(0, window.innerHeight - 180)
      ctx.lineTo(x8, y8)
      ctx.lineTo(x9, y9)
      ctx.lineTo(x10, y10)
      ctx.lineTo(x11, y11)
      ctx.lineTo(window.innerWidth, window.innerHeight - 180)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.moveTo(0, window.innerHeight - 200)
      ctx.lineTo(x12, y12)
      ctx.lineTo(x13, y13)
      ctx.lineTo(x14, y14)
      ctx.lineTo(x15, y15)
      ctx.lineTo(window.innerWidth, window.innerHeight - 200)
      ctx.stroke()

      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.fillStyle = '#222'
      ctx.moveTo(x, y)
      ctx.lineTo(x4, y4)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.moveTo(x1, y1)
      ctx.lineTo(x5, y5)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.moveTo(x2, y2)
      ctx.lineTo(x6, y6)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.moveTo(x3, y3)
      ctx.lineTo(x7, y7)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.moveTo(x4, y4)
      ctx.lineTo(x8, y8)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.moveTo(x5, y5)
      ctx.lineTo(x9, y9)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.moveTo(x6, y6)
      ctx.lineTo(x10, y10)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.moveTo(x7, y7)
      ctx.lineTo(x11, y11)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.moveTo(x8, y8)
      ctx.lineTo(x12, y12)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.moveTo(x9, y9)
      ctx.lineTo(x13, y13)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.moveTo(x10, y10)
      ctx.lineTo(x14, y14)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.moveTo(x11, y11)
      ctx.lineTo(x15, y15)
      ctx.stroke()
      timer = setTimeout(drawDot, 100)
    }
    drawDot()
    canvas.onmousemove = (event) => {
      myX = event.offsetX
      myY = event.offsetY
    }
    //рисование как paint
    // canvas.onmousedown = (event) => {
    //   canvas.onmousemove = (event) => {
    //     var x0 = event.offsetX
    //     var y0 = event.offsetY
    //     ctx.fillRect(x0 - 5, y0 - 5, 5, 5)
    //     ctx.fillStyle = 'black'
    //     ctx.fill()
    //   }
    //   canvas.onmouseup = () => {
    //     canvas.onmousemove = null
    //   }
    // }
  }
  setField=(field)=>{
    this.setState({[field.target.name]:field.target.value})
  }
  submitLogin = (e) => {
    if(this.state.login && this.state.pass){
      // $.get(`players?log=${this.state.login}&pass=${this.state.pass}`, async (response) => {
      //   if(response) {
      //     //console.log('RES-->', typeof(response), response)
      //     //let resjson = await response.json()
      //     let location = { pathname: '/constructor', state: { userInfo: response } }
      //     this.props.history.push(location)
      //   }
      // })
      //заглушка
      let location = { pathname: '/constructor', state: { userInfo: {id: 0, data: {avatar: ''}} } }
      this.props.history.push(location)
      e.preventDefault()
    } else if(this.state.fullname && this.state.setlogin && this.state.setpass) {
      $.get(`register?fullname=${this.state.fullname}&setlogin=${this.state.setlogin}&setpass=${this.state.setpass}`, (res) => {
        console.log('REGISTER SUCCESS-1->', res)
        let location = { pathname: '/constructor', state: { newRegistered: res } }
        this.props.history.push(location)
      })
    }
    e.preventDefault()
  }
  render() {
    const loginFields = (
      <div className="login_box_fields">
        <input type="text" placeholder="login" name="login" value={this.state.login} onChange={this.setField}/>
        <input type="password" placeholder="password" name="pass" value={this.state.pass} onChange={this.setField}/>
        <button type="submit">login</button>
      </div>
    )
    const registerFields=(
      <div className="login_box_fields">
        <input type="text" placeholder="your name" name="fullname" value={this.state.fullname} onChange={this.setField}/>
        <input type="text" placeholder="set login" name="setlogin" value={this.state.setlogin} onChange={this.setField}/>
        <input type="password" placeholder="set password" name="setpass" value={this.state.setpass} onChange={this.setField}/>
        <button type="submit">register</button>
      </div>
    )
    return (
      <div className="login_body">
        <canvas id="canvas_bg" className="canvas_background" width={window.innerWidth} height={window.innerHeight}>123</canvas>
        <div className="login_container">
        <span className="first_letter">A</span>
        <form className="login_box" onSubmit={this.submitLogin}>
          <h2>urora Studio Game</h2>
          {loginFields}
          {registerFields}
        </form>
        </div>
      </div>
    )
  }
}

export default Login