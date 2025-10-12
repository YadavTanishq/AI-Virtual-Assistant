import React, { createContext } from 'react'
export const userdatacontext=createContext()
function Usercontext({children}) {
  const serverurl="http://localhost:5000"
  const value={

  }
  return (
    <div>
      <userdatacontext.Provider value={value}>
        {children}
      </userdatacontext.Provider>
    
    </div>
  )
}

export default Usercontext