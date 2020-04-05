import React, { Component, Fragment} from 'react'
import Cities from './Cities'
import Players from './Players'
import HUD from './Hud'
import AllCities from '../cities'
import AllActions from '../actions'
import AllCasts from '../casts'
import '../css/board.css'
import { shuffle, shuffleDeck } from './DeckModules'
import { movePlayer, nextPlayer, selectCast } from './PlayerModules'
import { drawLines, endGame } from './GameModules'

class Board extends Component {

  state = {
    cities: {},
    mode: "normal",
    infectionCards: {},
    playerCards: {},
    actionCards: {},
    casts: {},
    gameSession: "starting",
    infectionCubes: {
      "yellow": {
        color: "yellow",
        pieces: 24,
      },
      "blue": {
        color: "blue",
        pieces: 24,
      },
      "red": {
        color: "red",
        pieces: 24,
      },
      "black": {
        color: "black",
        pieces: 24,
      },
    },
    players: {
      1: {
        id: 1,
        name: "SipiZork",
        location: "Chicago",
        cast: null,
        selectCast: false,
      },
      2: {
        id: 2,
        name: "Annamari",
        location: "Chicago",
        cast: null,
        selectCast: false,
      },
      3: {
        id: 3,
        name: "Zsuzsi",
        location: "Chicago",
        cast: null,
        selectCast: false,
      },
    },
    actualPlayer: 1,
    endGameState: {
      class: "endgame-screen hide",
      text: null
    },
  }
  // SZÜKSÉGES STATE ELEMEK FELTÖLTÉSE KÜLSŐ ADATOKBÓL
  componentDidMount() {
    this.setState({ cities: AllCities, actionCards: AllActions, casts: AllCasts })
  }

  checkGameSession = prevState => {
    if(prevState.gameSession !== this.state.gameSession) {
      if(this.state.gameSession === "started") {
        this.startGame()
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkGameSession(prevState)
  }

  // KEZDŐ JÉTLK ÁLLÁS BETÖLTÉSE
  startGame = () => {
    let infectionCards = {...this.state.infectionCards }
    let playerCards ={ ...this.state.playerCards }
    let counter = 1
    const { cities, actionCards } = this.state
    Object.keys(cities).map(city => {
      const card = {
        id: counter,
        name: city,
        text: null,
      }
      infectionCards[city] = card
      playerCards[city] = card
      counter++
      return null
    });
    // MEG KELL KEVERNI A FERTŐZÉSKÁRTYÁKAT
    Object.keys(actionCards).map(action => {
      const card = {
        id: counter,
        name: action,
        text: actionCards[action].text,
      }
      playerCards[action] = card
      counter++
      return null
    });
    // ITT EL KELL MAJD OSZTANI A MÁR AKTUÁLIS JÁTÉKOS KÁRTYÁKAT A STATE.MODE SZERINTI SZÁMMAL EGYELŐRE RÉSZEKRE, MINHDEGYIK VÉGÉRE ODA KELL TENNI EGY JÁRVÁNY KRÁTYÁK ÉS MINDEGYIKET EGYESÉVEL KELL MEGKEVERNI MAJD EGYMÁSRA TENNI ISMÉT
    let epidCard
    switch (this.state.mode) {
      case "easy":
        epidCard = 4
        break
      case "normal":
        epidCard = 5
        break
      case "hard":
        epidCard = 6
        break;
    }
    for(let i = 1; i <= epidCard; i++) {
      const card = {
        id: counter,
        name: `Epidemic${i}`,
        text: null,
      }
      playerCards[`Epidemic${i}`] = card
      counter++
    }
    // KEZDŐ KÁRTYÁK FELTÖLTÉSE
    infectionCards = shuffleDeck("infectionCards", infectionCards, this.state.mode)
    playerCards = shuffleDeck("playerCards", playerCards, this.state.mode)
    this.setState({ infectionCards, playerCards })
  }
  // JÁTÉKOS MOZGATÁSA
  movePlayer = city => {
    const players = {...this.state.players}
    const { actualPlayer, cities } = this.state
    const { location } = players[actualPlayer]
    const canMoveTo = cities[city].from
    canMoveTo.forEach(moveCity => {
      // console.log(moveCity);
      // console.log(location);
      if(moveCity === location ) {
        players[actualPlayer].location = city;
        this.setState({ players }, () => {
          // console.log(`Átmentél: ${city}`);
        });
      } else {
        // console.log("Ide nem tudsz lépni!");
      }
    });
  }
  // VÁROS FERTŐZÉSEK CSÖKKENTÉSE ADOTT ÉRTÉKKEL
  decrementInfection = (city, decrementBy)=> {
    const cities = {...this.state.cities }
    if(cities[city].infection > 0) {
      if(decrementBy <= cities[city].infection) {
        cities[city].infection = cities[city].infection - decrementBy
      } else {
          cities[city].infection = 0
      }
      this.setState({ cities })
    }
  }
  // VÁROS FERTŐZÉS ELKEZDÉSE
  startIncrement = (city, incrementBy) => {
    const cities = {...this.state.cities }
    // AZ ÖSSZES EDDIG KITÖRT VÁROS KITÖRÉSÉNEK TÖRLÉSE
    Object.keys(cities).map(city => {
      cities[city].outbreaked = false
      return null
    });
    this.setState({ cities }, () => {
      this.incrementInfection(city, incrementBy);
    })
  }
  // VÁROS FERTŐZÉS NÖVELÉSE ADDOT ÉRTÉKKEL
  incrementInfection = (city, incrementBy, color = null)=> {
    const cities = {...this.state.cities }
    const infectionCubes = {...this.state.infectionCubes}
    // HA KEVESEBB AZ EDDIGI FERTŐZÉS + HOZZÁADOTT ÉRTÉKM, MINT 4 AKKOR CSAK HOZZÁADJUK
    if(color === null) {
      color = cities[city].color
    }
    if(incrementBy + cities[city].infection <= 3) {
      cities[city].infection = cities[city].infection + incrementBy
      let colorCounter = 0;
      Object.keys(cities[city].infections).map(infectionColor => {
        // console.log(cities[city].infections[infectionColor]);
        if(cities[city].infections[infectionColor] === null && colorCounter < incrementBy){
          cities[city].infections[infectionColor] = color;
          infectionCubes[color].pieces = infectionCubes[color].pieces - 1
          this.checkInfectionCubes()
          colorCounter++;
        }
      });
    // KÜLÖNBEN (HA LEGALÁBB 4), AKKOR ÉS HA A VÁTOS KITÖRÉS ÉRTÉKE FALSE, A VÁROS KITÖR
    } else {
      if(!cities[city].outbreaked){
        Object.keys(cities[city].infections).map(infectionColor => {
          // console.log(cities[city].infections[infectionColor]);
          if(cities[city].infections[infectionColor] === null){
            cities[city].infections[infectionColor] = color;
            infectionCubes[color].pieces = infectionCubes[color].pieces - 1
            this.checkInfectionCubes()
          }
        });
        this.outBreak(city)
      }
    }
    this.setState({ cities })
  }
  // KITÖRÉS
  outBreak = (city) => {
    const cities = {...this.state.cities }
    cities[city].infection = 3
    if(!cities[city].outbreaked) {
      cities[city].from.forEach(beInfected => {
        // HA A FERTŐZENDŐ VÁROS FERTŐZÉSE KISEBB MINT 3, AKKOR CSAK HOZZÁADUNK EGY FERTŐZÉST
        if(cities[beInfected].infection < 3) {
          this.incrementInfection(beInfected, 1, cities[city].color)
        // KÜLÖNBEN (HA A FERTŐZENDŐ VÁROS FERTŐZÉSE LEGALÁBB 3), AKKOR ENNEK A VÁROSNAK AZ OUTBREAK ÉRTÉKÉT IGAZRA ÁLLÍTJUK, HOY NE FERTŐZÖDJÖN VISSZA A SZOMSZÉDOS VÁROS KITÖRÉSÉTŐL ÉS A FERTŐZENDŐ VÁROS KITÖR
        } else {
          cities[city].outbreaked = true
          this.outBreak(beInfected)
        }
      });
    }
  }

  checkInfectionCubes = () => {
    const infectionCubes = { ...this.state.infectionCubes }
    let lose = false
    let loseColor = null;
    Object.keys(infectionCubes).map(color => {
      // console.log(infectionCubes[color]);
      if(infectionCubes[color].pieces <= 0) {
        lose = true
        loseColor = color
      }
    });
    if(lose) {
      const result = endGame(this.state.endGameState, `Elfogytak a ${this.endGameColorSwticher(loseColor)} színű betegség kockák`)
      this.setState({ endGameState: result });
    }
  }

  endGameColorSwticher = color => {
    switch (color) {
      case "blue":
        return "kék"
      case "yellow":
        return "sárga"
      case "black":
        return "fekete"
      case "red":
        return "piros"
    }
  }

  renderBoard = () => {
    const { cities, players, actualPlayer } = this.state
    return (
      <Fragment>
        <div defaultclassname="endgame-screen hide" className={this.state.endGameState.class}>
          <div className="title">
            Vesztettetek
          </div>
          <div className="text">
            {this.state.endGameState.text}
          </div>
        </div>
        <svg className="city-lines">
          <path
            d={drawLines(this.state.cities)}
          />
          <filter id="filter1">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(240,232,0,1)"/>
          </filter>
        </svg>
        <Cities
          cities={cities}
          players={players}
          actualPlayer={actualPlayer}
          movePlayer={this.movePlayer}
          decrementInfection={this.decrementInfection}
          incrementInfection={this.startIncrement}
        />
        {/* <Players
          cities={cities}
          players={players}
          actualPlayer={actualPlayer}
        /> */}
        <HUD />
      </Fragment>
    )
  }

  selectCast = castId => {
    const result = selectCast(castId, this.state.players, this.state.actualPlayer, this.state.casts, this.state.gameSession)
    this.setState({ players: result[0], actualPlayer: result[1], gameSession: result[2]})
  }

  renderSelectCast = () => {
    const { casts } = this.state
    let castDivs = []
    Object.keys(casts).map(cast => {
      // console.log(casts[cast].name);
      castDivs.push(
        <div
          key={casts[cast].id}
          index={casts[cast].id}
          className="cast"
          onClick={() => this.selectCast(casts[cast].id)}
        >
          {casts[cast].name}
        </div>
      )
    })
    // console.log(castDivs);
    return (
      <Fragment>
        <div className="casts">
          {castDivs}
        </div>
      </Fragment>
    )
  }

  selectRenderState = () => {
    let castsSelected = true
    Object.keys(this.state.players).map(player => {
      if(this.state.players[player].cast === null ) {
        castsSelected = false
      }
    })
    if(this.state.gameSession === "starting") {
      return this.renderSelectCast()
    } else {
      return this.renderBoard()
    }
  }

  // TÁBLA KIRAJZOLÁSA
  render() {
    return (
      <Fragment>
        {this.selectRenderState()}
      </Fragment>
    )
  }
}

export default Board;
