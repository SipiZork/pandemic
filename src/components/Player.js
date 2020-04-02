import React, { Component, Fragment } from 'react';

class Player extends Component {
  render() {
    const { player, cities, actualPlayer } = this.props
    if(Object.keys(cities).length > 0) {
      const { positionX, positionY } = cities[player.location]
      return (
        <div
          className="player"
          style={{
            top: positionY,
            left: positionX,
          }}
        >
          <div className="name">
            {player.name}
          </div>
        </div>
        )
    } else {
      return <Fragment></Fragment>
    }
  }
}

export default Player
