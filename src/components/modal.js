import React, { Component } from 'react';
import './componentsStyle.css'
import $ from 'jquery'

const Modal = (props) => {
  
    const text = props.text
    const buttons = props.buttons
    return (
        <div className='modal_box'>
          <p className='modal_text'>{text}</p>
          {buttons.map((button => {
              return <button className='modal_btn' onClick={e => button.btnEvent(e)}>{button.btnText}</button>
          }))}
        </div>
      )
}
export default Modal