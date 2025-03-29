import React, { Component } from 'react'
import { useState, useCallback } from "react"
import './componentsStyle.css'
import Dndelement from './dndelement'
import $ from 'jquery'

class Dndcontainer extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
  }
  componentDidMount(){
      if(this.props.list) {
        this.setState({ list: this.props.list })
      }
  }

    // const moveCard = useCallback(
    //     (dragIndex, hoverIndex) => {
    //         const dragCard = cards[dragIndex]
    //         // let newCards = cards
    //         // newCards[hoverIndex] = dragCard,
    //         // newCards.splice(dragIndex, 1)
    //         cards.splice(dragIndex, 1)
    //         cards[hoverIndex] = dragCard
    //         setCards(cards)
    //     },
    //     [cards]
    // )

    // const renderCard = (card, index) => {
    //     return (
    //       <Dndelement
    //         key={card.id}
    //         index={index}
    //         id={card.id}
    //         text={card.text}
    //         moveCard={moveCard}
    //       />
    //     );
    //   }

  moveCard = (dragIndex, hoverIndex) => {
    console.log('111->', dragIndex, hoverIndex)
    let newList = this.state.list || []
    let dragCard = newList[dragIndex]
    let hoverCard = newList[hoverIndex]
    newList.splice(hoverIndex, 1, dragCard)
    newList.splice(dragCard, 1, hoverCard)
    this.setState({ list: newList })
  }

  renderCard = (card, index) => {
    return (
      <Dndelement key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        color={card.color}
        moveCard={this.moveCard}
      />
    )
  }

  render() {
    return (
      <div style={{ position: 'absolute',
        width: '700px',
        height: '700px',
        top: '50px',
        left: '100px',
        backgroundColor: 'grey',
        border: '2xp solid black',
        padding: '30px',
        zIndex: '50',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        flexWrap: 'wrap'
      }}>
          {this.state.list.map((card, i) => this.renderCard(card, i))}
      </div>
    )
  }
}
export default Dndcontainer