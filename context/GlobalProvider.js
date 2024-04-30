import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUSer } from "../lib/appwrite";

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)


const GLobalProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUSer().then((res) => {
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
      } else {
        setIsLoading(false)
        setUser(null)
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])


  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export default GLobalProvider;