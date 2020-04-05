export const drawLines = cities => {
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
  })
  return paths
}

export const endGame = (endGameState,text) => {
  endGameState.class = "endgame-screen show"
  endGameState.text = text
  return endGameState
}
