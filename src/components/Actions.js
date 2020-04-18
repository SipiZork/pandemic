import React, { Component, Fragment } from 'react'

class Actions extends Component {

  renderActualPlayerACtions = () => {

  }

  renderACtions = () => {

  }

  selectRender = () => {

  }

  render() {
    return (
      <Fragment>
        <div className="action move-with-car" onClick={() =>this.props.selectAction("move-with-car")}>Mozgás A</div>
        <div className="action move-with-plane" onClick={() =>this.props.selectAction("move-with-plane")}>Mozgás R</div>
        <div className="action move-with-private" onClick={() =>this.props.selectAction("move-with-private")}>Mozgás P</div>
        <div className="action move-with-base" onClick={() =>this.props.selectAction("move-with-base")}>Mozgás B</div>
        <div className="action build-base" onClick={() =>this.props.selectAction("build-base")}>Bázis</div>
        <div className="action treatment" onClick={() =>this.props.selectAction("treatment")}>Kezelés</div>
        <div className="action share-knowledge" onClick={() =>this.props.selectAction("share-knowledge")}>Csere</div>
        <div className="action develpoment-actiserum" onClick={() =>this.props.selectAction("develpoment-actiserum")}>Antiszérum</div>
      </Fragment>
    )
  }
}

export default Actions;
