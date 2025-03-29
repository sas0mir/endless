import React, { Component } from 'react';
import './componentsStyle.css'
import $ from 'jquery'

const Helper = (props) => {
  
    const text = props.text
    const defaultText = `"W" translate | "E" rotate | "R" scale | "+/-" adjust size\n
"Q" toggle world/local space |  "Shift" snap to grid\n
"X" toggle X | "Y" toggle Y | "Z" toggle Z | "Spacebar" toggle enabled\n
"C" toggle camera | "V" random zoom`
    return (
        <div className='helper_box'>
          <pre className='helper_text'>{text || defaultText}</pre>
        </div>
      )
}
export default Helper