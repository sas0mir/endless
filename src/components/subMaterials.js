import React, { Component } from 'react';
import './componentsStyle.css'
import $ from 'jquery'

class SubMaterials extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  componentDidMount(){
      
  }

  handleItemClick = (m) => {
    this.props.setMaterial(m)
  }

  render() {

    const grass = <div className='instruments_subcontainer'>
          <button className='submaterial_btn subinstrument_btn_one' onClick={e => this.handleItemClick('/textures/grass1.jpg')}>
            <img src='/textures/grass1.jpg' className='submaterial_item'/>
          </button>
          <button className='submaterial_btn subinstrument_btn_two' onClick={e => this.handleItemClick('/textures/grass1.jpg')}>
            <img src='/textures/grass2.jpg' className='submaterial_item'/>
          </button>
          <button className='submaterial_btn subinstrument_btn_three' onClick={e => this.handleItemClick('/textures/grass3.jpg')}>
            <img src='/textures/grass3.jpg' width='50' height='50' className='submaterial_item'/>
          </button>
    </div>

    const ground = <div className='instruments_subcontainer'>
      <button className='submaterial_btn subinstrument_btn_one' onClick={e => this.handleItemClick('/textures/ground1.jpg')}>
        <img src='/textures/ground1.jpg' className='submaterial_item'/>
      </button>
      <button className='submaterial_btn subinstrument_btn_two' onClick={e => this.handleItemClick('/textures/ground2.jpg')}>
        <img src='/textures/ground2.jpg' className='submaterial_item'/>
      </button>
      <button className='submaterial_btn subinstrument_btn_three' onClick={e => this.handleItemClick('/textures/ground3.jpg')}>
        <img src='/textures/ground3.jpg' width='50' height='50' className='submaterial_item'/>
      </button>
    </div>

const wall = <div className='instruments_subcontainer'>
<button className='submaterial_btn subinstrument_btn_one' onClick={e => this.handleItemClick('/textures/wall1.jpg')}>
  <img src='/textures/wall1.jpg' className='submaterial_item'/>
</button>
<button className='submaterial_btn subinstrument_btn_two' onClick={e => this.handleItemClick('/textures/wall2.jpg')}>
  <img src='/textures/wall2.jpg' className='submaterial_item'/>
</button>
<button className='submaterial_btn subinstrument_btn_three' onClick={e => this.handleItemClick('/textures/wall3.jpg')}>
  <img src='/textures/wall3.jpg' width='50' height='50' className='submaterial_item'/>
</button>
</div>

const wood = <div className='instruments_subcontainer'>
      <button className='submaterial_btn subinstrument_btn_one' onClick={e => this.handleItemClick('/textures/wood1.jpg')}>
        <img src='/textures/wood1.jpg' className='submaterial_item'/>
      </button>
      <button className='submaterial_btn subinstrument_btn_two' onClick={e => this.handleItemClick('/textures/wood2.jpg')}>
        <img src='/textures/wood2.jpg' className='submaterial_item'/>
      </button>
      <button className='submaterial_btn subinstrument_btn_three' onClick={e => this.handleItemClick('/textures/wood3.jpg')}>
        <img src='/textures/wood3.jpg' width='50' height='50' className='submaterial_item'/>
      </button>
    </div>

    const subMenu = this.props.open === 'grass' ? grass :
    this.props.open === 'ground' ? ground :
    this.props.open === 'wall' ? wall : wood

    return (
      <div className='submaterials_box'>
        {subMenu}
      </div>
    )
  }
}
export default SubMaterials