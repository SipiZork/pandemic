import React, { Component, Fragment } from 'react';

class City extends Component {

  colorSwitcher = color => {
    switch (color) {
      case "blue":
        return "rgba(0,240,240,1)"
      case "yellow":
        return "rgba(245,245,56,1)"
      case "black":
        return "rgba(41,41,41,1)"
      case "red":
        return "rgba(204,35,16,1)"
      default:
        return "rgba(255,255,255,1)"
    }
  }

  lines = (lines, linesTo, positionX, positionY, name) => {
    if(lines) {
      const posX = positionX + 75
      const posY = positionY + 15
      const lineToX = linesTo[0]
      const lineToY = linesTo[1]
      return (
        <Fragment>
          <svg>
            <path
              d={`M${posX} ${posY} L${lineToX} ${lineToY}`}
            />
          </svg>
        </Fragment>
      )
    } else {
      return null
    }
  }

  base = (base, name) => {
    if(base) {
      return (
        <Fragment>
          <div className="base">
            <svg>
              <path

              />
            </svg>
          </div>
        </Fragment>
      )
    } else {
      return null;
    }
  }

  infection = (infection, name) => {
    const { city, cities } = this.props
    if(infection > 0) {
      const infections = [];
      for(let i = 1; i <= infection; i++){
          infections.push(<div className="infection" style={{ backgroundColor: this.colorSwitcher(cities[city].infections[i])}}></div>);
      }
      return (
        <Fragment>
          <div className="infections">
            {infections}
          </div>
        </Fragment>
      )
    }
  }

  render() {
    const { city, cities, movePlayer } = this.props
    const { name, positionX, positionY, infection, base, color, lines, linesTo } = cities[city]
    return (
      <Fragment key={city}>
        <div
          className="city"
          style={{
            top: positionY,
            left: positionX,
          }}
        >
          <div
            className="circle"
            onClick={() => this.props.incrementInfection(city, 1)}
            style={{ backgroundColor: this.colorSwitcher(color) }}
          ></div>
          <div className="name">
            {name}
          </div>
          {this.base(base, name)}
          {this.infection(infection, name)}
        </div>
        {this.lines(lines, linesTo, positionX, positionY, name)}
      </Fragment>
    );
  }
}

export default City;
