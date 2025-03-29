import React, { Component } from 'react';
import _ from 'lodash'
import $ from 'jquery'
import DropZone from './dropZone'
import './componentsStyle.css'

class SettingsModal extends Component {
  constructor() {
    super();
    this.state = {
      form: {}
    }
  }
  componentDidMount(){
      if(this.props.formValues) {
        this.setState({ form: this.props.formValues.data, player_id: this.props.formValues.id })
      }
  }
  handleClose = () => {
    this.props.onClose()
  }
  setField(value, field) {
    this.setState({ form: {...this.state.form, [field]: value} })
  }
  saveField() {
    if(_.get(this.state, ['form', 'avatar'])) {
      var data = new FormData()
        data.append('avatar', _.get(this.state, ['form', 'avatar']))
        console.log('222->', this.state.form, data)
        fetch(`upload?file_id=${this.state.player_id}`, { method: 'POST', body: data }).then((response) => {
          if(response.status === 200 || response.statusText === 'OK') {
            $.post(`players?player_id=${this.state.player_id}&fullname=${this.state.form.fio}&setlogin=${this.state.form.log}&setpass=${this.state.form.pass}&setavatar=${_.get(this.state, ['form', 'avatar', 'name'])}`, (userInfo) => {
              this.handleClose()
            })
          }
        }).catch(console.error)
    } else {
      $.post(`players?player_id=${this.state.player_id}&fullname=${this.state.form.fio}&setlogin=${this.state.form.log}&setpass=${this.state.form.pass}`, (userInfo) => {
        this.handleClose()
      })
    }
  }
  render() {
    return (
      <div className='settings_modal'>
        <button className='settings_close_btn' onClick={e => this.handleClose()}>x</button>
        <div className='settings_row'>
            <h3 className='settings_row_title'>ACCOUNT111</h3>
            <h5 className='settings_row_label'>nickname</h5>
            <input className='settings_input_field'
                  onChange={n => this.setField(n.target.value, 'fio')}
                  placeholder={this.state.form.fio}/>
        </div>
        <div className='settings_row'>
            <h5 className='settings_row_label'>login</h5>
            <input className='settings_input_field'
                  onChange={n => this.setField(n.target.value, 'log')}
                  placeholder={this.state.form.log}/>
            <h5 className='settings_row_label'>password</h5>
            <input className='settings_input_field'
                  onChange={n => this.setField(n.target.value, 'pass')}
                  placeholder={this.state.form.pass}/>
        </div>
        <div className='settings_row'>
            <h3 className='settings_row_title'>YOU CAN UPLOAD PHOTO</h3>
            <DropZone file={f => this.setField(f, 'avatar')} playerId={this.state.player_id}/>
            <button className='settings_submit' onClick={e=>this.saveField()}>SAVE</button>
        </div>
      </div>
    )
  }
}
export default SettingsModal