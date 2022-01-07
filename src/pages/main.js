import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './login'
import Constructor from './constructor'
import Game from './game'

class Main extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount(){
      // fetch('users/getuser').then(res=>{
      //     return res.text()
      // }).then(text=>{
      //     this.setState({answer: text})
      // })
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/constructor' component={Constructor}/>
          <Route exact path='/game' component={Game}/>
        </Switch>
      </main>
    )
  }
}
export default Main