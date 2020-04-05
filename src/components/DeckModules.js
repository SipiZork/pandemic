// MEGKEVER EGY KÁRTYAPAKLIT
export const shuffle = deck => {
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

// JÁTÉK KEZDETÉHEZ MEGKEVERI AZ EGÉSZ PAKLIT
export const shuffleDeck = (deck, cards, mode) => {
  if(deck === "infectionCards") {
    let cardArray = []
    Object.keys(cards).map(card => {
      cardArray.push(cards[card].name)
    })
    cardArray = shuffle(cardArray)
    Object.keys(cards).map(card => {
      for(let i = 0; i < cardArray.length; i++) {
        if(cardArray[i] === cards[card].name) {
          const city = {...cards[cards[card].name]}
          city.id = i+1
          cards[cards[card].name] = city
        }
      }
    })
  }
  if(deck === "playerCards") {
    let cardArray = []
    Object.keys(cards).map(card => {
      cardArray.push(cards[card].name)
    })
    for(let i = 0; i < cardArray.length; i++) {
      if(cardArray[i] === "Epidemic1") {
        let infCard
        switch (mode) {
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
    cardArray = shuffle(cardArray)
    let divided
    switch (mode) {
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

    array1 = shuffle(array1)
    array2 = shuffle(array2)
    array3 = shuffle(array3)
    array4 = shuffle(array4)
    array5 = shuffle(array5)
    array6 = shuffle(array6)
    array7 = shuffle(array7)

    cardArray = unionDecks(array1, array2, array3, array4, array5, array6, array7, divided);
    Object.keys(cards).map(card => {
      for(let i = 0; i < cardArray.length; i++) {
        if(cardArray[i] === cards[card].name) {
          const city = {...cards[cards[card].name]}
          city.id = i+1
          cards[cards[card].name] = city
        }
      }
    })
    console.log(cards);
  }
  return cards
}

const unionDecks = (deck1, deck2, deck3, deck4, deck5, deck6, deck7, divided) => {
  let deck = []
  console.log(divided);
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
