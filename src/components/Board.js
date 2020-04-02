import React, { Component, Fragment} from 'react'
import Cities from './Cities'
import Players from './Players'
import HUD from './Hud'
import AllCities from '../cities.js'
import AllActions from '../actions.js'
import '../css/board.css'

class Board extends Component {

  state = {
    cities: {},
    mode: "normal",
    infectionCards: {},
    playerCards: {},
    actionCards: {},
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
      player1: {
        id: "player1",
        name: "SipiZork",
        location: "Atlanta",
        cast: "Researcher",
      },
      player2: {
        id: "player2",
        name: "Annamari",
        location: "Miami",
        cast: "Medic",
      }
    },
    actualPlayer: "player1",
    endGameState: {
      class: "endgame-screen hide",
      text: null
    },
  }
  // SZÜKSÉGES STATE ELEMEK FELTÖLTÉSE KÜLSŐ ADATOKBÓL
  componentDidMount() {
    this.setState({ cities: AllCities, actionCards: AllActions }, () => {
      this.startGame()
    })
  }
  // KEZDŐ JÉTLK ÁLLÁS BETÖLTÉSE
  startGame = () => {
    let infectionCards = {}
    let playerCards ={}
    let counter = 1
    const { cities, actionCards } = this.state
    Object.keys(cities).map(city => {
      const card = {
        id: counter,
        name: city,
        text: null,
      }
      infectionCards[counter] = card
      playerCards[counter] = card
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
    for(let i = 0; i < 6; i++) {
      const card = {
        id: counter,
        name: "Járvány",
        text: null,
      }
      playerCards[`Epidemic${counter}`] = card
      counter++
    }
    // KEZDŐ KÁRTYÁK FELTÖLTÉSE
    this.setState({ infectionCards: infectionCards, playerCards: playerCards })
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
          console.log(this.checkInfectionCubes())
          colorCounter++;
        }
      });
    // KÜLÖNBEN (HA LEGALÁBB 4), AKKOR ÉS HA A VÁTOS KITÖRÉS ÉRTÉKE FALSE, A VÁROS KITÖR
    } else {
      if(!cities[city].outbreaked){
        Object.keys(cities[city].infections).map(infectionColor => {
          console.log(cities[city].infections[infectionColor]);
          if(cities[city].infections[infectionColor] === null){
            cities[city].infections[infectionColor] = color;
            infectionCubes[color].pieces = infectionCubes[color].pieces - 1
            console.log(this.checkInfectionCubes())
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

  drawLines = () => {
    const { cities } = this.state
    let paths = "";
    Object.keys(cities).map(city => {
      const path = cities[city].path
      if(path !== null) {
        cities[city].path.forEach(fromCity => {
          // console.log(fromCity);
          const cityPosX = cities[city].positionX + 75
          const cityPosY = cities[city].positionY + 15
          const fromCityPosX = cities[fromCity].positionX + 75
          const fromCityPosY = cities[fromCity].positionY + 15
          paths += (`M200 335 L0 325 M200 340 L0 375 M190 436 L0 520 M1635 323 L1880 330 M1630 590 L1880 550 M1640 820 L1880 730 M${fromCityPosX } ${fromCityPosY} L${cityPosX} ${cityPosY} `)
        })
      }
      return null
    })
    return paths
  }

  checkInfectionCubes = () => {
    const infectionCubes = { ...this.state.infectionCubes }
    let lose = false
    let loseColor = null;
    Object.keys(infectionCubes).map(color => {
      console.log(infectionCubes[color]);
      if(infectionCubes[color].pieces <= 0) {
        lose = true
        loseColor = color
      }
    });
    if(lose) {
      this.endGame(`Elfogytak a ${this.endGameColorSwticher(loseColor)} színű betegség kockák`)
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

  endGame = (text) => {
    const endGameDiv =  document.querySelector('.end-screen')
    const endGameState = {...this.state }
    endGameState.class = "endgame-screen show"
    endGameState.text = text
    this.setState({ endGameState })
  }

  // TÁBLA KIRAJZOLÁSA
  render() {
    const { cities, players, actualPlayer } = this.state
    return (
      <Fragment>
        <div className={this.state.endGameState.class}>
          <div className="title">
            Vesztettetek
          </div>
          <div className="text">
            {this.state.endGameState.text}
          </div>
        </div>
        <svg className="city-lines">
          <path
            d={this.drawLines()}
          />
          <filter id="filter1">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(240,232,0,1)"/>
          </filter>
        </svg>
        <Cities
          cities={cities}
          actualPlayer={actualPlayer}
          movePlayer={this.movePlayer}
          decrementInfection={this.decrementInfection}
          incrementInfection={this.startIncrement}
        />
        <Players
          cities={cities}
          players={players}
          actualPlayer={actualPlayer}
        />
        <HUD />
      </Fragment>
    )
  }
}

export default Board;
