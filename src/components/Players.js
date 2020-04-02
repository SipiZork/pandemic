import React, { Component, Fragment } from 'react';
import Player from './Player'
import '../css/players.css'

class Players extends Component {
  render() {
    const { players, cities } = this.props
      return (
        <Fragment>
          {Object.keys(players).map(player => (
            <Player
              key={player}
              cities={cities}
              player={players[player]}
            />
            ))}
        </Fragment>
      )
  }
}

export default Players
