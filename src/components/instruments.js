import React, { Component } from 'react';
import './componentsStyle.css'
import $ from 'jquery'

class Instruments extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  componentDidMount(){
      
  }

  render() {
    return (
      <div className='instruments_box'>
        <div className='instruments_container'>
          <button className='instrument_btn instrument_btn_one' onClick={e => this.props.openSubInstruments('primitives')}>
            <img src='/instrument_cube.png' width='50' height='50' className='instrument_item'/>
          </button>
          <button className='instrument_btn instrument_btn_two' name='sphere' onClick={e => this.props.openSubInstruments('exterior')}>
            <img src='/instrument_exterior.png' width='50' height='50' className='instrument_item'/>
          </button>
          <button className='instrument_btn instrument_btn_three' name='cone' onClick={e => this.props.openSubInstruments('interior')}>
            <img src='/instrument_interior.png' width='50' height='50' className='instrument_item'/>
          </button>
          <button className='instrument_btn instrument_btn_four' name='cylinder' onClick={e => this.props.openSubInstruments('light')}>
            <img src='/instrument_cylinder.png' width='50' height='50' className='instrument_item'/>
          </button>
        </div>
      </div>
    )
  }
}
export default Instruments