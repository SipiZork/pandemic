import React, { Component, Fragment } from 'react';

class PlayerCards extends Component {

  state = {
    hasCard: false,
    classes: "player-card-handler empty",
    playerFieldText: "Kijátszott játékos kártyák",
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state) {

    }
    if(prevProps !== undefined && prevProps !== this.props) {
      const {cardType, cards} = this.props
      if(cardType==="player") {
        let played = []
        let available = []
        Object.keys(cards).map(card => {
          if(cards[card].played) {
            played.push(cards[card])
          }
        })
        if(played.length > 0) {
          this.setState({ hasCard: true, playerFieldText: played[played.length-1].name })
          console.log(played);
        } else {
          this.setState({ hasCard: false, playerFieldText: "Kijátszott játékos kártyák" })
        }
      }
    }
  }

  render() {
    const {cardType, cards} = this.props
    if(cardType === "player"){
      return (
        <Fragment>
          <div className={this.state.classes}>{this.state.playerFieldText}</div>
        </Fragment>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default PlayerCards;
