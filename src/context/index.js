import {createContext} from 'react'

export const AuthContext = createContext({
    isLoaded: false,
    user: null,
    userRole: null,
    setUser: () => {},
    setUserRole: () => {},
    logOut: () => {},
  });