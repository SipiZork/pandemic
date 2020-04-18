import React, { Fragment } from 'react'
import Board from './Board'

function App() {
  return (
    <Fragment>
      {/* <svg className="city-lines">
        <path className="north-america" />
        <path className="south-america" />
        <filter id="filter1">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(240,232,0,1)"/>
        </filter>
      </svg> */}
      <Board />
    </Fragment>
  )
}

export default App


// this.ref = base.syncState(`pandemic/táblaelérése`, {
//       context: this,
//       state: "todos"
//     });
