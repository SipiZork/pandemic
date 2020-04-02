import React, { Component, Fragment } from 'react'
import City from './City'
import '../css/cities.css'

class Cities extends Component {

  render() {
    return (
      <Fragment>
        {Object.keys(this.props.cities).map(city => (
          <City
            key={city}
            city={city}
            cities={this.props.cities}
            actualPlayer={this.props.actualPlayer}
            movePlayer={this.props.movePlayer}
            decrementInfection={this.props.decrementInfection}
            incrementInfection={this.props.incrementInfection}
          />
        ))}
      </Fragment>
    );
  }
}

export default Cities;
