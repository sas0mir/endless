import React, { Component } from 'react';
import './componentsStyle.css'
import $ from 'jquery'

class MaterialShop extends Component {
  constructor() {
    super();
    this.state = {
      materials: ['/textures/grass1.jpg',
      '/textures/ground1.jpg',
      '/textures/wall1.jpg',
      '/textures/wood1.jpg']
    }
  }
  componentDidMount(){
      
  }

  handleClick = (subIdx) => {
    let subMaterial = subIdx === 0 ? 'grass' : subIdx === 1 ? 'ground' : subIdx === 2 ? 'wall' : 'wood'
    this.props.openSubMaterials(subMaterial)
  }
  render() {
    return (
      <div className='materialshop'>
        <div className='materialshop_container'>
          {this.state.materials.map((m, idx) => {
              return <button key={idx} className='materialshop_btn' onClick={e => this.handleClick(idx)}>
              <img src={m} width='50' height='50' className='materialshop_item'/>
            </button>
          })}
        </div>
      </div>
    )
  }
}
export default MaterialShop