import React, { Component } from 'react';
import './componentsStyle.css'

class InterfaceIcon extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount(){
    
  }
  handleClickIcon = () => {
    this.props.handleClickIcon(this.props.icon)
  }
  render() {
      let src = '/icon-' + this.props.icon + '.png'
    return (
      <div className={'icon_container ' + this.props.containerClass} onClick={e => this.handleClickIcon()}>
        <img src={src} className='icon_img'/>
        <div className='icon_tooltip'>{this.props.tip}</div>
        {this.props.icon === 'menu' ? <div className='icon_dropdown'>
          <ul className='icon_dropdown_list'>
            <li className='icon_dropdown_item'></li>
          </ul>
        </div>: null}
      </div>
    )
  }
}
export default InterfaceIcon