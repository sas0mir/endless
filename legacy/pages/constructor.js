import React, { Component } from 'react';
import Interface from '../components/interface'
import _ from 'lodash'
import $ from 'jquery'
import SettingsModal from '../components/SettingsModal'
import ConstructorScene from '../components/constructorScene'

class Constructor extends Component {
  constructor() {
    super();
    this.state = {
      newMaterial: '',
      edit: null, //{dimension: '', step: ''},
      subMenu: '',
      mode: 'constructor'
    }
  }
  componentDidMount(){
    if(_.get(this.props, ['location', 'state', 'userInfo', 0])) {
      this.setState({ userInfo: _.get(this.props, ['location', 'state', 'userInfo', 0]) }, () => this.getUser())
    }
    if(_.get(this.props, ['location', 'state', 'newRegistered'])) {
      this.setState({ userInfo: _.get(this.props, ['location', 'state', 'newRegistered']), opened: 'settings' }, () => this.getUser())
    }
  }

  getUser = () => {
    //заглушка
    this.setState({ avatarImage: '', userInfo: { log: 'admin', fio: 'stas', pass: 'Cvbhyjd11' } })
    // fetch(`players/getuser?id=${_.get(this.state, ['userInfo', 'id'])}`, {method: 'GET'}).then( async response => {
    //   let resjson = await response.json()
    //   this.setState({ userInfo: resjson[0] }, () => {
    //     let filename = _.get(this.state, ['userInfo', 'id']) + '_' + _.get(this.state, ['userInfo', 'data', 'avatar'])
    //     $.get(`upload?filename=${filename}`, (avatar) => {
    //       if(avatar) {
    //         this.setState({ avatarImage: avatar })
    //       }
    //     })
    //   })
    // })
  }

  openModal = (e) => {
    this.setState({ opened: e })
  }

  startGame = (scene) => {
    let location = { pathname: '/game', state: { userInfo: this.state.userInfo, testScene: scene } }
      this.props.history.push(location)
  }

  render() {

    return (
      <main className='constructor_box'>
        <ConstructorScene mode={this.state.mode} startGame={this.startGame}/>
        <Interface userInfo={this.state.userInfo} avatar={this.state.avatarImage} handleClick={e => this.openModal(e)} mode={m => this.setState({mode: m})}/>
        {this.state.opened === 'settings' ? <SettingsModal formValues={this.state.userInfo} onClose={() => this.setState({ opened: null })}/> : null}
      </main>
    )
  }
}
export default Constructor