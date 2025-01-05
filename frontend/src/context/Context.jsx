import React from 'react'
import { createContext } from 'react'
 export const myContext = createContext()

const Context = () => {
    const username = "after clicking on one of the post the dialog should open in that dialog there should be post img and all other details and the user which uploaded the post ";
  return (
    <div>
      <myContext.Provider>
        <App />
      </myContext.Provider>
    </div>
  )
}

export default Context
