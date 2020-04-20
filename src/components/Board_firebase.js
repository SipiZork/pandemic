import React, { Component, Fragment} from 'react'
import Cities from './Cities'
import Players from './Players'
import HUD from './Hud'
import AllCities from '../cities'
import AllActions from '../actions'
import AllCasts from '../casts'
import base from '../base'
import '../css/board.css'

class Board extends Component {

  state = {
    board: {
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
    },
    render: false,
  }

  componentDidMount() {

    this.ref = base.syncState(`pandemic/${this.props.match.params.pandemicId}`, {
      context: this,
      state: "board"
    });

    const board = { ...this.state.board }
    let player
    if(localStorage.getItem("creator") && localStorage.getItem("creator") !== null) {
      player = {
        id: 1,
        name: localStorage.getItem("creator"),
        location: 'Atlanta',
        cast: null,
        selectCast: false,
        actions: 0,
        creator: true,
        ready: true,
      }
      localStorage.setItem("user", JSON.stringify(player))
      localStorage.removeItem("creator")
      this.installGame(player)
    }
  }

  componentDidUpdate() {
    const board = {...this.state.board}
    if(board.players.length > 0 && localStorage.getItem("player") && localStorage.getItem("player") !== null && localStorage.getItem("joined") && localStorage.getItem("joined") === "no") {
      let player = {
        id: board.players.length,
        name: localStorage.getItem("player"),
        location: 'Atlanta',
        cast: null,
        selectCast: false,
        actions: 0,
        creator: false,
        ready: false,
      }
      board.players[board.players.length] = player
      localStorage.setItem("joined", "yes")
      localStorage.setItem("user", JSON.stringify(player))
      localStorage.removeItem("player")
      this.setState({ board })
    }
    if(localStorage.getItem("user") && localStorage.getItem("user") !== null && !this.state.render) {
      this.setState({ render: true })
    }
    if(board.gameSession === "starting") {
      let allSelect = true
      Object.keys(board.players).map(player => {
        if(board.players[player].selectCast === false) {
          allSelect = false
        }
      })
      if(allSelect === true) {
        board.gameSession = "started"
        this.setState({ board })
      }
    }
  }

  installGame = player => {
    const board = {...this.state.board}
    board.cities = AllCities
    board.actionCards = AllActions
    board.casts = AllCasts
    board.infectionCards = this.createInfectionDeck()
    board.playerCards = this.createPlayerDeck()
    board.players[1] = player
    this.setState({ board }, () => {
      this.setState({ render: true })
    })
  }

  createInfectionDeck = () => {
    let infectionCards = {}
    let counter = 1
    Object.keys(AllCities).map(city => {
      const card = {
        id: counter,
        name: city,
        played: false,
        text: null,
      }
      infectionCards[city] = card
      counter++
      return null
    })
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
          infectionCards[infectionCards[card].name].id = i+1
        }
      }
    })
    return infectionCards
  }

  createPlayerDeck = () => {
    let playerCards = {}
    let counter = 1
    Object.keys(AllCities).map(city => {
      const card = {
        id: counter,
        name: city,
        played: false,
        text: null,
      }
      playerCards[city] = card
      counter++
      return null
    })
    Object.keys(AllActions).map(action => {
      const card = {
        id: counter,
        name: action,
        played: false,
        text: AllActions[action].text,
      }
      playerCards[action] = card
      counter++
      return null
    })
    let epidCard
    switch (this.state.board.mode) {
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
    let cardArray = []
    Object.keys(playerCards).map(card => {
      cardArray.push(playerCards[card].name)
    })
    for(let i = 0; i < cardArray.length; i++) {
      if(cardArray[i] === "Epidemic1") {
        let infCard
        switch (this.state.board.mode) {
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
    for(let i = cardArray.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = cardArray[i]
      cardArray[i] = cardArray[j]
      cardArray[j] = temp
    }
    let divided
    switch (this.state.board.mode) {
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
          playerCards[playerCards[card].name].id = i+1
        }
      }
    })
    return playerCards
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

  selectRenderState = () => {
    if(this.state.board.gameSession === "waiting") {
      return this.renderWaitingRoom()
    } else if(this.state.board.gameSession === "starting") {
      return this.renderSelectCast()
    } else {
      return this.renderBoard()
    }
  }

  startButton = () => {
    const board = {...this.board}
    board.gameSession = "starting"
    this.setState({ board })
  }

  needButton = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const players = this.state.board.players
    if(user.creator) {
      let allReady = true
      Object.keys(players).map(player => {
        if(players[player].ready === false) {
          allReady = false
        }
      })
      if(allReady && players.length > 2) {
        console.log(players.length);
        return (
          <form className="start-button" onSubmit={this.startButton}>
            <button type="submit">Indítás</button>
          </form>
        )
      }
    } else {
      if(players[user.id].ready === true){
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
  }

  toggleReady = e => {
    const clickedId = parseInt(e.target.parentElement.getAttribute("index"))
    const user = JSON.parse(localStorage.getItem("user"))
    const board = {...this.state.board}
    if(clickedId === user.id) {
      board.players[clickedId].ready = !board.players[clickedId].ready
    }
    this.setState({ board })
  }

  renderWaitingRoom = () => {
    const existPlayers = this.state.board.players
    let players = []
    let readyPlayers = []
    if(Object.keys(existPlayers).length > 0) {
      Object.keys(existPlayers).map(player => {
        if(existPlayers[player].id > 0) {
          players.push(<div index={existPlayers[player].id}className="waiting-room-player">{existPlayers[player].name}</div>)
          readyPlayers.push(
            <Fragment>
              <div className="ready-player" index={existPlayers[player].id}>
                <div className="player-icon">{existPlayers[player].ready ? "֍" : "x"}</div>
                <div className="player-name">{existPlayers[player].name}</div>
                <div className="player-click" onClick={(e) => this.toggleReady(e)}></div>
              </div>
            </Fragment>
          )
        }
      })
    }
    return (
      <Fragment>
        <div className="waiting-room-wrapper">
          <div className="waiting-room-players">
            {players}
            {this.needButton()}
          </div>
        </div>
        <div className="ready-wrapper">
          <div className="ready-players">
            {readyPlayers}
          </div>
        </div>
      </Fragment>
    )
  }

  drawLines = () => {
    const board = this.state.board
    let paths = "";
    Object.keys(board.cities).map(city => {
      const path = board.cities[city].path
      console.log(path);
      if(path !== undefined) {
        board.cities[city].path.forEach(fromCity => {
          // console.log(fromCity);
          const cityPosX = board.cities[city].positionX + 75
          const cityPosY = board.cities[city].positionY + 15
          const fromCityPosX = board.cities[fromCity].positionX + 75
          const fromCityPosY = board.cities[fromCity].positionY + 15
          paths += (`M200 335 L0 325 M200 340 L0 375 M190 436 L0 520 M1635 323 L1880 330 M1630 590 L1880 550 M1640 820 L1880 730 M${fromCityPosX } ${fromCityPosY} L${cityPosX} ${cityPosY} `)
        })
      }
      return null
    })
    return paths
  }

  movePlayer = city => {
    const board = {...this.state.board}
    const { actualPlayer, cities } = this.state.board
    const { location } = board.players[actualPlayer]
    const canMoveTo = board.cities[city].from
    canMoveTo.forEach(moveCity => {
      // console.log(moveCity);
      // console.log(location);
      if(moveCity === location ) {
        board.players[actualPlayer].location = city;
        this.setState({ board }, () => {
          // console.log(`Átmentél: ${city}`);
        });
      } else {
        // console.log("Ide nem tudsz lépni!");
      }
    });
  }

  drawInfectionCard = () => {
    console.log("Hello");
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

  renderBoard = () => {
    const { cities, players, actualPlayer, infectionCards, playedInfectionCards, playerCards, gameSession, selectedAction } = this.state.board
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(infectionCards);
    return (
      <Fragment>
        <div defaultclassname="endgame-screen hide" className={this.state.board.endGameState.class}>
          <div className="title">
            Vesztettetek
          </div>
          <div className="text">
            {this.state.board.endGameState.text}
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
          // decrementInfection={this.decrementInfection}
          // incrementInfection={this.startIncrement}
        />
        {/* <Players
          cities={cities}
          players={players}
          actualPlayer={actualPlayer}
        /> */}
        <HUD
          cities={cities}
          players={players}
          actualPlayer={user.id}
          selectedAction={selectedAction}
          gameSession={gameSession}
          infectionCards={infectionCards}
          playerCards={playerCards}
          playedInfectionCards={playedInfectionCards}
          drawInfectionCard={this.drawInfectionCard}
          // selectAction={this.selectAction}
        />
      </Fragment>
    )
  }

  renderSelectCast = () => {
    const board = {...this.state.board}
    let castDivs = []
    Object.keys(board.casts).map(cast => {
      castDivs.push(
        <div
          key={board.casts[cast].id}
          index={board.casts[cast].id}
          className="cast"
          onClick={() => this.selectCast(board.casts[cast].id)}
        >
          {board.casts[cast].name}
        </div>
      )
    })
    // console.log(castDivs);
    return (
      <Fragment>
        <div className="waitingfor-wrapper">
          <div className="waitingfor">{this.state.board.players[this.state.board.actualPlayer].name} választ kasztot</div>
        </div>
        <div className="casts">
          {castDivs}
        </div>
      </Fragment>
    )
  }

  selectCast = id => {
    const board = {...this.state.board}
    const user = JSON.parse(localStorage.getItem("user"))
    if(board.actualPlayer === user.id) {
      board.players[board.actualPlayer].cast = board.casts[id].name
      board.players[board.actualPlayer].selectCast = true
      board.casts[id] = null
      board.actualPlayer = this.nextPlayer()
      this.setState({ board })
    } else {
      console.log("Nem te választasz")
    }
  }

  nextPlayer = () => {
    const board = {...this.state.board}
    let nextPlayer = 0
    if(board.actualPlayer === board.players.length-1) {
      nextPlayer = 1
    } else {
      nextPlayer = board.actualPlayer + 1
    }
    console.log(nextPlayer);
    return nextPlayer
  }

  render() {
    return (
      <Fragment>
        {this.state.render ? this.selectRenderState() : ""}
      </Fragment>
    )
  }

}

export default Board;
