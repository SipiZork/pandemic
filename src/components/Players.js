import React, { Component, Fragment } from 'react';
import Player from './Player'
import '../css/players.css'

class Players extends Component {
  render() {
    const { players, city } = this.props
      return (
        <Fragment>
          {Object.keys(players).map(player => {
            if(players[player].location === city) {
              return (
                <Player
                  players={players}
                  player={player}
                />
              )
            }
          })}
        </Fragment>
      )
  }
}

export default Players
