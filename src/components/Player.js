import React, { Component, Fragment } from 'react';

class Player extends Component {
  render() {
    const { player } = this.props
      return (
        <div
          className="player"
        >
          <div className="hover">

          </div>
          <div className="bubble">
            <svg>
              <path />
            </svg>
          </div>
          <div className="name">
            {/* {player.name} */}
          </div>
          </div>
        )
  }
}

export default Player
