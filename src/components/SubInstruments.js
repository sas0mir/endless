import React, { Component } from 'react';
import './componentsStyle.css'
import $ from 'jquery'

class SubInstruments extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  componentDidMount(){
      
  }

  handleItemClick = (item, submenu) => {
    this.props.createMesh(item, submenu)
  }

  render() {

    const primitives = <div className='instruments_subcontainer'>
          <button className='subinstrument_btn subinstrument_btn_one' onClick={e => this.handleItemClick('box', 'primitives')}>
            <img src='/instrument_cube.png' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_two' name='sphere' onClick={e => this.handleItemClick('sphere', 'primitives')}>
            <img src='/instrument_sphere.png' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_three' name='cone' onClick={e => this.handleItemClick('cone', 'primitives')}>
            <img src='/instrument_cone.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_four' name='cylinder' onClick={e => this.handleItemClick('cylinder', 'primitives')}>
            <img src='/instrument_cylinder.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_five' name='circle' onClick={e => this.handleItemClick('circle', 'primitives')}>
            <img src='/instrument_circle.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_six' name='plane' onClick={e => this.handleItemClick('plane', 'primitives')}>
            <img src='/instrument_plane.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_seven' name='dodecahedron' onClick={e => this.handleItemClick('dodecahedron', 'primitives')}>
            <img src='/instrument_dodecahedron.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_eight' name='extrude' onClick={e => this.handleItemClick('extrude', 'primitives')}>
            <img src='/instrument_extrude.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_nine' name='lathe' onClick={e => this.handleItemClick('lathe', 'primitives')}>
            <img src='/instrument_lathe.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_ten' name='octahedron' onClick={e => this.handleItemClick('octahedron', 'primitives')}>
            <img src='/instrument_octahedron.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_eleven' name='ring' onClick={e => this.handleItemClick('ring', 'primitives')}>
            <img src='/instrument_ring.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_twelve' name='text' onClick={e => this.handleItemClick('text', 'primitives')}>
            <img src='/instrument_text.png' width='50' height='50' className='subinstrument_item'/>
          </button>
          <button className='subinstrument_btn subinstrument_btn_thirteen' name='torus' onClick={e => this.handleItemClick('torus', 'primitives')}>
            <img src='/instrument_torus.png' width='50' height='50' className='subinstrument_item'/>
          </button>
    </div>

    const interior = <div className='instruments_subcontainer'>
      <button className='subinstrument_btn subinstrument_btn_one' name='chair_classic_wood' onClick={e => this.handleItemClick('chair_classic_wood', 'interior')}>
        <img src='/instrument_chair.png' className='subinstrument_item'/>
      </button>
      <button className='subinstrument_btn subinstrument_btn_two' name='chair_future_metal' onClick={e => this.handleItemClick('chair_future_metal', 'interior')}>
        <img src='/instrument_chair.png' className='subinstrument_item'/>
      </button>
      <button className='subinstrument_btn subinstrument_btn_three' name='table_classic_wood' onClick={e => this.handleItemClick('table_classic_wood', 'interior')}>
        <img src='/instrument_cube.png' width='50' height='50' className='subinstrument_item'/>
      </button>
      <button className='subinstrument_btn subinstrument_btn_four' name='table_future_1' onClick={e => this.handleItemClick('table_future_1', 'interior')}>
        <img src='/instrument_cube.png' width='50' height='50' className='subinstrument_item'/>
      </button>
    </div>

const exterior = <div className='instruments_subcontainer'>
  <button className='subinstrument_btn subinstrument_btn_one' name='tree_europ_1' onClick={e => this.handleItemClick('tree_europ_1', 'exterior')}>
    <img src='/instrument_chair.png' className='subinstrument_item'/>
  </button>
</div>

    const subMenu = this.props.open === 'primitives' ? primitives : this.props.open === 'interior' ? interior : this.props.open === 'exterior' ? exterior : <div>{this.props.open}</div>

    return (
      <div className='subinstruments_box'>
        {subMenu}
      </div>
    )
  }
}
export default SubInstruments