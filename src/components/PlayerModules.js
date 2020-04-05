export const movePlayer = (cities, city, players, actualPlayer) => {
  const { location } = players[actualPlayer]
  const canMoveTo = cities[city].from
  console.log(players);
  canMoveTo.forEach(moveCity => {
    // console.log(moveCity);
    // console.log(location);
    if(moveCity === location ) {
      players[actualPlayer].location = city
      return players
    } else {
      return "Nem sikerült átmenneda kiválasztott városba"
    }
  });

}

export const nextPlayer = (players, actualPlayer, gameSession) => {
  let nextPlayer
  let newGameSession = "starting"
  Object.keys(players).map(player => {
    if(players[player].id === actualPlayer ) {
      nextPlayer = players[player].id + 1
    }
  })
  if(players[nextPlayer] === null || players[nextPlayer] === undefined) {
    nextPlayer = 1
    if(gameSession === "starting") {
      newGameSession = "started"
    }
  }
  return [nextPlayer, newGameSession]
}

export const selectCast = (castId, players, actualPlayer, casts, gameSession) => {
  players[actualPlayer].cast = casts[castId].name
  players[actualPlayer].selectCast = true
  delete casts[castId]
  const result = nextPlayer(players, actualPlayer, gameSession)
  return [players, result[0], result[1]]
}
