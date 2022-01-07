import React, { Component } from 'react'
import './componentsStyle.css'
import Dndcontainer from './dndcontainer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import $ from 'jquery'

const Dndzone = (props) => {
  
    const list = [
      {
        id: 121,
        text: "1",
        color: 'red'
      },
      {
        id: 122,
        text: "2",
        color: 'green'
      },
      {
        id: 134,
        text: "3",
        color: 'blue'
      },
      {
        id: 145,
        text: "4",
        color: 'white'
      },
      {
        id: 165,
        text: "5",
        color: 'black'
      },
      {
        id: 169,
        text: "6",
        color: 'grey'
      },
      {
        id: 171,
        text: "7",
        color: 'yellow'
      },
      {
        id: 221,
        text: "12",
        color: 'red'
      },
      {
        id: 222,
        text: "22",
        color: 'green'
      },
      {
        id: 234,
        text: "23",
        color: 'blue'
      },
      {
        id: 245,
        text: "24",
        color: 'white'
      },
      {
        id: 265,
        text: "25",
        color: 'black'
      },
      {
        id: 269,
        text: "26",
        color: 'grey'
      },
      {
        id: 271,
        text: "27",
        color: 'yellow'
      }
  ]
    
    return (
        <DndProvider backend={HTML5Backend}>
                <Dndcontainer list={list}/>
        </DndProvider>
      )
}
export default Dndzone