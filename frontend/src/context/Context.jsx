import React from 'react'
import { createContext } from 'react'
 export const myContext = createContext()

const Context = () => {
    const username = "sarthak sharma";
  return (
    <div>
      <myContext.Provider>
        <App />
      </myContext.Provider>
    </div>
  )
}

export default Context
