import React, { Component, Fragment } from 'react'
import PlayerCards from './PlayerCards'
import InfectionCards from './InfectionCards'
import Actions from './Actions'
import '../css/hud.css'

class HUD extends Component {
  render() {
    return (
      <Fragment>
        <div className="cards-wrapper">
          <div className="player-cards">
            <PlayerCards
              cards={this.props.playerCards}
            />
          </div>
          <div className="infection-cards">
            <InfectionCards
              actualPlayer={this.props.actualPlayer}
              gameSession={this.props.gameSession}
              infectionCards={this.props.infectionCards}
              drawInfectionCard={this.props.drawInfectionCard}
              playedInfectionCards={this.props.playedInfectionCards}
            />
          </div>
        </div>
        <div className="action-wrapper">
          <Actions
            selectedAction={this.props.selectedAction}
            actualPlayer={this.props.actualPlayer}
            gameSession={this.props.gameSession}
            selectAction={this.props.selectAction}
          />
        </div>
      </Fragment>
    )
  }
}

export default HUD;
