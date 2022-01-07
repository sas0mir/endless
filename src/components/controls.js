import React, { Component } from 'react';
import './componentsStyle.css'
import _ from 'lodash'

class Controls extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      obj: {}
    }
  }
  componentDidMount(){
      
  }

  componentWillReceiveProps(nextProps) {
    console.log('CONTROL-PROPS->', nextProps)
    if(nextProps.open) {
      this.setState({open: true})
    }
    if(nextProps.object && nextProps.object.id !== _.get(this.state, ['obj', 'id'])) {
      this.setState({obj: _.get(nextProps, ['object', 'obj_body']) || {}})
    }
  }

  handleClick = (dimension, step) => {
    this.props.setEdit(dimension, step)
  }

  openControls = () => {
    this.setState({ open: !this.state.open })
  }

  handleChange = (attribute, value) => {
    this.props.setEdit(attribute, value)
  }

  render() {
    let {obj} = this.state
    console.log('OBJ->', obj)
    return (
      <div className='control_wrapper'>
        <button onClick={this.openControls} className={this.state.open ? 'control_wrapper_btn_opened' : 'control_wrapper_btn'}>{this.state.open ? '<' : 'mesh props'}</button>
        <div className={this.state.open ? 'control_box' : 'control_box_hidden'}>
        <div className='control_block'>
            <h6 className='control_block_title'>OBJECT: {obj.name} ID: {obj.id}</h6>
            <div className='control_movs_row'>
                <span className='control_movs_label'>Name:</span>
                <input className='control_movs_input' onChange={e => this.handleChange('name', e.target.value)} placeholder={obj.name}></input>
            </div>
            <div className='control_movs_row'>
                <span className='control_movs_label'>Purpose:</span>
                <select className='control_movs_select' name="select" onChange={e => this.handleChange('game_type', e.target.value)} value={obj.game_type}>
                  <option value="static" selected>static</option>
                  <option value="dynamic">dynamic</option>
                  <option value="breakable">breakable</option>
                </select>
            </div>
            <div className='control_movs_row'>
                <span className='control_movs_label'>Rigid:</span>
                <input className='control_movs_checkbox' type='checkbox' onChange={e => this.handleChange('rigid', e.target.checked)} checked={obj.rigid}></input>
            </div>
            <div className='control_movs_row'>
                <span className='control_movs_label'>Mass:</span>
                <input className='control_movs_input' onChange={e => this.handleChange('mass', e.target.value)} placeholder={obj.mass}></input>
            </div>
            <div className='control_movs_row'>
                <span className='control_movs_label'>Segments:</span>
                <input className='control_movs_input' onChange={e => this.handleChange('segments', e.target.value)} placeholder={obj.segments}></input>
            </div>
        </div>
          <div className='control_block'>
            <button className='control_movs_btn_long' onClick={e => this.handleChange('delete', true)}>DELETE</button>
          </div>
        </div>
      </div>
    )
  }
}
export default Controls