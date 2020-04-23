import React, { Component, Fragment} from 'react'
import '../css/createlogin.css'

class CreateLogin extends Component {

  createRoom = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    localStorage.setItem("creator", name)
    this.props.history.push(`/pandemic/${Date.now()}`)
  }

  joinRoom = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    localStorage.setItem("player", name)
    localStorage.setItem("joined", "no")
    this.props.history.push(`/pandemic/${this.props.match.params.pandemicId}`)
  }

  selectRender = () => {
    const {pandemicId} = this.props.match.params
    if(pandemicId && pandemicId !== null){
      console.log("Belépés");
      return (
        <div className="game-wrapper">
          <div className="game">
            <form className="game-form" onSubmit={(e) => this.joinRoom(e)}>
              <div className="inputBox">
                <input type="name" name="name" defaultValue="" className="input" required="required" autoComplete="off"/>
                <span>Felhasználónév</span>
              </div>
              <div className="button-wrapper">
                <button type="submit">Csatlakozás</button>
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      console.log("Létrehozás");
      return (
        <div className="game-wrapper">
          <div className="game">
            <form className="game-form" onSubmit={(e) => this.createRoom(e)}>
              <div className="inputBox">
                <input type="name" name="name" defaultValue="SipiZork" className="input" required="required" autoComplete="off"/>
                <span>Felhasználónév</span>
              </div>
              <div className="button-wrapper">
                <button type="submit">Létrehozás</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <Fragment>
        {this.selectRender()}
      </Fragment>
    )
  }
}

export default CreateLogin;
