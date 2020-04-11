import React, { Component, Fragment } from 'react';
import cardback from '../css/img/infection-card-back.png'

class infectionCards extends Component {

  state = {
    hasCard: false,
    availableClasses: "available-deck empty",
    availableTextField: "Fertőzés kártyák",
    playedClasses: "played-deck empty",
    playedTextField: "Kijátszott fertőzés kártyák",
    img: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== undefined && prevProps !== this.props) {
      let availableClasses
      let playedClasses
      let img
      const {infectionCards, playedInfectionCards} = this.props
      if (Object.keys(infectionCards).length > 0) {
        availableClasses = "available-deck"
        img = true
      } else {
        availableClasses = "available-deck empty"
        img = false
      }
      if (Object.keys(playedInfectionCards).length > 0) {
        playedClasses = "played-deck"
      } else {
        playedClasses = "played-deck empty"
      }
      this.setState({ availableClasses: availableClasses, img: img, playedClasses: playedClasses})
    }
  }

  clickable = () => {
    if(this.props.gameSession === "started" && this.props.actualPlayer === 1) {
      return (
        <div className="cardback" onClick={this.props.drawInfectionCard}>
          <img src={cardback} alt="kartya"/>
        </div>
      )
    } else {
      return (
        <div className="cardback">
          <img src={cardback} alt="kartya"/>
        </div>
      )
    }
  }

  availableDeck = () => {
    const {img} = this.state

    if(img) {
      return this.clickable()
    } else {
      return this.state.availableTextField
    }
  }

  playedDeck = () => {
    const playedCards = this.props.playedInfectionCards
    if(this.state.playedClasses === "played-deck"){
      let lastCard = 0
      let lastCardName
      Object.keys(playedCards).map(card => {
        if(playedCards[card].id > lastCard) {
          lastCard = playedCards[card].id
          lastCardName = playedCards[card].name
        }
      })
      return (
        <div className="cardback">
          <div className="last-card">
            {lastCardName}
          </div>
        </div>
      )
    } else {
      return this.state.playedTextField
    }
  }

  render() {
    return (
      <Fragment>
        <div className={this.state.availableClasses}>
          {this.availableDeck()}
        </div>
        <div className={this.state.playedClasses}>
          {this.playedDeck()}
        </div>
      </Fragment>
    )
  }
}

export default infectionCards;
