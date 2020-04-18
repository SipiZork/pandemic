import React, { Component, Fragment} from 'react'
import Cities from './Cities'
import Players from './Players'
import HUD from './Hud'
import AllCities from '../cities'
import AllActions from '../actions'
import AllCasts from '../casts'
import '../css/board.css'

class Board extends Component {

  state = {
    cities: {},
    mode: "normal",
    infectionCards: {},
    playerCards: {},
    playedPlayerCards: {},
    startCards: 0,
    playedInfectionCards: {},
    selectedAction: 0,
    actionCards: {},
    casts: {},
    gameSession: "waiting",
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
    players: {},
    actualPlayer: 1,
    endGameState: {
      class: "endgame-screen hide",
      text: null
    },
  }
  // SZÜKSÉGES STATE ELEMEK FELTÖLTÉSE KÜLSŐ ADATOKBÓL
  componentDidMount() {
    let player
    const players = {...this.state.players}
    if(localStorage.getItem("player1") && localStorage.getItem("player1") !== null) {
      player = {
        id: 1,
        name: localStorage.getItem("player1"),
        location: "Atlanta",
        cast: null,
        selectCast: null,
        actions: 0,
        creator: true,
      }
      players[1] = player
    } else {
      let nextPlayer = 0
      Object.keys(players).map(player => {
        if(players[player].id > nextPlayer) {
          nextPlayer = players[player].id
        }
      })
      nextPlayer++
      player = {
        id: nextPlayer,
        name: localStorage.getItem("username"),
        location: "Atlanta",
        cast: null,
        selectCast: null,
        actions: 0,
        creator: false,
      }
      players[nextPlayer] = player
    }
    localStorage.removeItem("player1");
    localStorage.setItem("user", JSON.stringify(player))
    this.setState({ cities: AllCities, actionCards: AllActions, casts: AllCasts, players })
  }

  checkGameSession = prevState => {
    if(prevState.gameSession !== this.state.gameSession) {
      if(this.state.gameSession === "started") {
        this.startGame()
      }
      if(this.state.gameSession === "play") {
        console.log("elindítva");
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkGameSession(prevState)
    if(this.state.gameSession === "started" && this.state.startCards === 6) {
      this.setState({ gameSession: "play" })
    }
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
        played: false,
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
        played: false,
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
    this.setState({ infectionCards , playerCards }, () => {
      this.shuffleDeck("infectionCards")
      this.shuffleDeck("playerCards")
    })
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
      // console.log(infectionCubes[color]);
      if(infectionCubes[color].pieces <= 0) {
        lose = true
        loseColor = color
      }
    });
    if(lose) {
      this.endGame(`Elfogytak a ${this.endGameColorSwticher(loseColor)} színű betegség kockák`)
    }
  }

  shuffle = (deck) => {
    if(deck.length > 1) {
      for(let i = deck.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
      }
    }
    return deck
  }

  unionDecks = (deck1, deck2, deck3, deck4, deck5, deck6, deck7, divided) => {
    let deck = []
    // console.log(divided);
    if(deck5.length > 0 && deck5.length < divided+1 ) { for(let i = 0; i < deck5.length; i++ ) { deck.unshift(deck5[i]) }}
    if(deck6.length > 0 && deck6.length < divided+1 ) { for(let i = 0; i < deck6.length; i++ ) { deck.unshift(deck6[i]) }}
    if(deck7.length > 0 && deck7.length < divided+1 ) { for(let i = 0; i < deck7.length; i++ ) { deck.unshift(deck7[i]) }}
    if(deck1.length > 0 && deck1.length === divided+1) { for(let i = 0; i < deck1.length; i++ ) { deck.push(deck1[i]) }}
    if(deck2.length > 0 && deck2.length === divided+1) { for(let i = 0; i < deck2.length; i++ ) { deck.push(deck2[i]) }}
    if(deck3.length > 0 && deck3.length === divided+1) { for(let i = 0; i < deck3.length; i++ ) { deck.push(deck3[i]) }}
    if(deck4.length > 0 && deck4.length === divided+1) { for(let i = 0; i < deck4.length; i++ ) { deck.push(deck4[i]) }}
    if(deck5.length > 0 && deck5.length === divided+1) { for(let i = 0; i < deck5.length; i++ ) { deck.push(deck5[i]) }}
    if(deck6.length > 0 && deck6.length === divided+1) { for(let i = 0; i < deck6.length; i++ ) { deck.push(deck6[i]) }}
    if(deck7.length > 0 && deck7.length === divided+1) { for(let i = 0; i < deck7.length; i++ ) { deck.push(deck7[i]) }}
    return deck;
  }

  shuffleDeck = (deck) => {
    if(deck === "infectionCards") {
      const infectionCards = { ...this.state.infectionCards }
      let cardArray = []
      Object.keys(infectionCards).map(card => {
        cardArray.push(infectionCards[card].name)
      })
      for(let i = cardArray.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = cardArray[i]
        cardArray[i] = cardArray[j]
        cardArray[j] = temp
      }
      Object.keys(infectionCards).map(card => {
        for(let i = 0; i < cardArray.length; i++) {
          if(cardArray[i] === infectionCards[card].name) {
            const city = {...infectionCards[infectionCards[card].name]}
            city.id = i+1
            infectionCards[infectionCards[card].name] = city
          }
        }
      })
      this.setState({ infectionCards })
    }
    if(deck === "playerCards") {
      const playerCards = { ...this.state.playerCards }
      let cardArray = []
      Object.keys(playerCards).map(card => {
        cardArray.push(playerCards[card].name)
      })
      for(let i = 0; i < cardArray.length; i++) {
        if(cardArray[i] === "Epidemic1") {
          let infCard
          switch (this.state.mode) {
            case "easy":
              infCard = 4
              break
            case "normal":
              infCard = 5
              break
            case "hard":
              infCard = 6
              break;
          }
          cardArray.splice(i,infCard);
        }
      }
      // console.log(cardArray);
      for(let i = cardArray.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = cardArray[i]
        cardArray[i] = cardArray[j]
        cardArray[j] = temp
      }
      // Object.keys(playerCards).map(card => {
      //   for(let i = 0; i < cardArray.length; i++) {
      //     if(cardArray[i] === playerCards[card].name) {
      //       const city = {...playerCards[playerCards[card].name]}
      //       city.id = i+1
      //       playerCards[playerCards[card].name] = city
      //     }
      //   }
      // })
      // el kell osztani megfelelő számú egyforma tömbre és belerakni egy egy kártyát, külön megkverni és egymásra rakni
      let divided
      switch (this.state.mode) {
        case "easy":
          divided = 13
          break
        case "normal":
          divided = 10
          break
        case "hard":
          divided = 8
          break;
      }
        let array1 = []
        let array2 = []
        let array3 = []
        let array4 = []
        let array5 = []
        let array6 = []
        let array7 = []
        for(let i = 0; i < cardArray.length; i++){
          if(i < divided) {
            array1.push(cardArray[i])
          } else if(i < divided * 2 ) {
            array2.push(cardArray[i])
          } else if(i < divided * 3 ) {
            array3.push(cardArray[i])
          } else if(i < divided * 4 ) {
            array4.push(cardArray[i])
          } else if(i < divided * 5 ) {
            array5.push(cardArray[i])
          } else if(i < divided * 6 ) {
            array6.push(cardArray[i])
          } else {
            array7.push(cardArray[i])
          }
        }
      if(array1.length === divided ) { array1.push("Epidemic1")}
      if(array2.length === divided ) { array2.push("Epidemic2")}
      if(array3.length === divided ) { array3.push("Epidemic3")}
      if(array4.length === divided ) { array4.push("Epidemic4")}
      if(array5.length === divided ) { array5.push("Epidemic5")}
      if(array6.length === divided ) { array6.push("Epidemic6")}

      array1 = this.shuffle(array1)
      array2 = this.shuffle(array2)
      array3 = this.shuffle(array3)
      array4 = this.shuffle(array4)
      array5 = this.shuffle(array5)
      array6 = this.shuffle(array6)
      array7 = this.shuffle(array7)

      cardArray = this.unionDecks(array1, array2, array3, array4, array5, array6, array7, divided);
      Object.keys(playerCards).map(card => {
        for(let i = 0; i < cardArray.length; i++) {
          if(cardArray[i] === playerCards[card].name) {
            const city = {...playerCards[playerCards[card].name]}
            city.id = i+1
            playerCards[playerCards[card].name] = city
          }
        }
      })
      // Object.keys(playerCards).map(card => {
      //   for(let i = 0; i < cardArray.length; i++) {
      //     if(cardArray[i] === playerCards[card].name) {
      //       const city = {...playerCards[playerCards[card].name]}
      //       city.id = i+1
      //       playerCards[playerCards[card].name] = city
      //     }
      //   }
      // })
      this.setState({ playerCards })
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

  selectAction = action => {
    let actionCode = 0;
    switch (action) {
      case "move-with-car":
        actionCode=1
        break
      case "move-with-plane":
        actionCode=2
        break
      case "move-with-private":
        actionCode=3
        break
      case "move-with-base":
        actionCode=4
        break
      case "build-base":
        actionCode=5
        break
      case "treatment":
        actionCode=6
        break
      case "share-knowledge":
        actionCode=7
        break
      case "develpoment-actiserum":
        actionCode=8
        break
      default:
        actionCode=0
    }
    if(actionCode > 0 && actionCode !== this.state.selectedAction){
      this.setState({ selectedAction: actionCode })
    }
  }

  renderBoard = () => {
    const { cities, players, actualPlayer, infectionCards, playedInfectionCards, playerCards, gameSession, selectedAction } = this.state
    // console.log(infectionCards);
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
        <div className="city-lines-wrapper">
          <svg className="city-lines">
            <path
              d={this.drawLines()}
            />
            <filter id="filter1">
              <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(240,232,0,1)"/>
            </filter>
          </svg>
        </div>
        <Cities
          cities={cities}
          players={players}
          actualPlayer={actualPlayer}
          selectedAction={selectedAction}
          movePlayer={this.movePlayer}
          decrementInfection={this.decrementInfection}
          incrementInfection={this.startIncrement}
        />
        {/* <Players
          cities={cities}
          players={players}
          actualPlayer={actualPlayer}
        /> */}
        <HUD
          cities={cities}
          players={players}
          actualPlayer={actualPlayer}
          selectedAction={selectedAction}
          gameSession={gameSession}
          infectionCards={infectionCards}
          playerCards={playerCards}
          playedInfectionCards={playedInfectionCards}
          drawInfectionCard={this.drawInfectionCard}
          selectAction={this.selectAction}
        />
      </Fragment>
    )
  }

  nextPlayer = () => {
    const { players, actualPlayer } = this.state
    let nextPlayer
    let gameSession = "starting"
    Object.keys(players).map(player => {
      if(players[player].id === actualPlayer ) {
        nextPlayer = players[player].id + 1
      }
    })
    if(players[nextPlayer] === null || players[nextPlayer] === undefined) {
      nextPlayer = 1
      if(this.state.gameSession === "starting") {
        gameSession = "started"
      }
    }
    this.setState({ actualPlayer: nextPlayer, gameSession: gameSession })
  }

  selectCast = id => {
    const { actualPlayer } = this.state
    const players = { ...this.state.players }
    const casts = { ...this.state.casts }
    players[actualPlayer].cast = casts[id].name
    players[actualPlayer].selectCast = true
    this.setState({ players }, () => {
      delete casts[id]
      this.setState({ casts }, () => {
        this.nextPlayer()
      })
    })
  }

  drawInfectionCard = () => {
    const infectionCards =  {...this.state.infectionCards}
    const playedInfectionCards = {...this.state.playedInfectionCards}
    if(Object.keys(infectionCards).length > 0) {
      Object.keys(infectionCards).map(card => {
        if(infectionCards[card].id === 1) {
          let nextPlayedId = 0
          let playedCard = infectionCards[card]
          if(Object.keys(playedInfectionCards).length > 0) {
            Object.keys(playedInfectionCards).map(playedCard => {
              if(playedInfectionCards[playedCard].id > nextPlayedId) {
                nextPlayedId = playedInfectionCards[playedCard].id
              }
            })
          }
          nextPlayedId++
          playedCard.id = nextPlayedId
          playedInfectionCards[card] = playedCard
          delete infectionCards[card]
          if(this.state.gameSession === "started" && this.state.startCards < 6) {
            if(this.state.startCards < 2) {
              this.incrementInfection(playedCard.name, 3)
            } else if(this.state.startCards < 4) {
              this.incrementInfection(playedCard.name, 2)
            } else if(this.state.startCards < 6) {
              this.incrementInfection(playedCard.name, 1)
            }
          }
        }
      })
      Object.keys(infectionCards).map(card => {
        infectionCards[card].id = infectionCards[card].id-1
      })
      this.setState({ infectionCards, playedInfectionCards, startCards: this.state.startCards+1 })
    }
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

  needStartButton = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    if(user.creator) {
      return (
        <form className="start-button" onSubmit={this.startButton}>
          <button type="submit">Indítás</button>
        </form>
      )
    } else {
      return (
        <div className="waiting-loader">
          Várakozás az indításra
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      )
    }
  }

  renderWaitingRoom = () => {
    console.log(Object.keys(this.state.players).length);
    let players = []
    if(Object.keys(this.state.players).length > 0) {
      console.log("Nagyobb, mint 0");
      Object.keys(this.state.players).map(player => {
        console.log(this.state.players[player]);
        players.push(<div className="waiting-room-player">{this.state.players[player].name}</div>)
      })
    }
    return (
      <div className="waiting-room-wrapper">
        <div className="waiting-room-players">
          {players}
          {players}
          {players}
          {players}
          {players}
          {this.needStartButton()}
        </div>
      </div>
    )
  }

  selectRenderState = () => {
    let castsSelected = true
    // Object.keys(this.state.players).map(player => {
    //   if(this.state.players[player].cast === null ) {
    //     castsSelected = false
    //   }
    // })
    if(this.state.gameSession === "waiting") {
      return this.renderWaitingRoom()
    } else if(this.state.gameSession === "starting") {
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
