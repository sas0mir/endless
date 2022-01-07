import React, { Component } from 'react';
import './componentsStyle.css'
import $ from 'jquery'

const SideMenuGenerator = (props) => {
    const { type, position, action, childs } = props
    const containerClass = 'side_menu_' + position
    let inner = {}
    switch(type) {
        case 'modification':
            inner = childs.map(ch => {
                return <button onClick={e => action(e, ch)}>{ch}</button>
            })
            break
    }
    return (
        <div className={containerClass}>
            {inner}
        </div>
      )
}
export default SideMenuGenerator