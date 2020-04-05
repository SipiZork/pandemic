export const decrementInfection = (cities, city, decrementBy)=> {
  console.log("Itt");
  if(cities[city].infection > 0) {
    if(decrementBy <= cities[city].infection) {
      cities[city].infection = cities[city].infection - decrementBy
    } else {
        cities[city].infection = 0
    }
  }
  return cities
}

export const startIncrement = cities => {
  // AZ ÖSSZES EDDIG KITÖRT VÁROS KITÖRÉSÉNEK TÖRLÉSE
  Object.keys(cities).map(city => {
    cities[city].outbreaked = false
  });
  return cities
}

export const incrementInfection = (cities, city, incrementBy, infectionCubes, color = null) => {
  console.log("Itt");
  // HA KEVESEBB AZ EDDIGI FERTŐZÉS + HOZZÁADOTT ÉRTÉKM, MINT 4 AKKOR CSAK HOZZÁADJUK
  if(color === null) {
    color = cities[city].color
  }
  if(incrementBy + cities[city].infection <= 3) {
    cities[city].infection = cities[city].infection + incrementBy
    let colorCounter = 0;
    Object.keys(cities[city].infections).map(infectionColor => {
      if(cities[city].infections[infectionColor] === null && colorCounter < incrementBy){
        cities[city].infections[infectionColor] = color;
        infectionCubes[color].pieces = infectionCubes[color].pieces - 1
        checkInfectionCubes(infectionCubes)
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
          checkInfectionCubes(infectionCubes)
        }
      });
      outBreak(city)
    }
  }
  return cities, infectionCubes
}

const outBreak = (cities, city, infectionCubes) => {
  cities[city].infection = 3
  if(!cities[city].outbreaked) {
    cities[city].from.forEach(beInfected => {
      // HA A FERTŐZENDŐ VÁROS FERTŐZÉSE KISEBB MINT 3, AKKOR CSAK HOZZÁADUNK EGY FERTŐZÉST
      if(cities[beInfected].infection < 3) {
        this.incrementInfection(cities, beInfected, 1, infectionCubes, cities[city].color)
      // KÜLÖNBEN (HA A FERTŐZENDŐ VÁROS FERTŐZÉSE LEGALÁBB 3), AKKOR ENNEK A VÁROSNAK AZ OUTBREAK ÉRTÉKÉT IGAZRA ÁLLÍTJUK, HOY NE FERTŐZÖDJÖN VISSZA A SZOMSZÉDOS VÁROS KITÖRÉSÉTŐL ÉS A FERTŐZENDŐ VÁROS KITÖR
      } else {
        cities[city].outbreaked = true
        this.outBreak(cities, beInfected, infectionCubes)
      }
    });
  }
}

const checkInfectionCubes = infectionCubes => {
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
