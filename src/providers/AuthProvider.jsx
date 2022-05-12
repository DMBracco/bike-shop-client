import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context';

export default function AuthProvider(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUserData] = useState(null);
    const [userRole, setUserRoleData] = useState(null);

      const logOut = useCallback(() => {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('auth')
        localStorage.removeItem('role')
      }, []);

      const setUser = useCallback((data) => {
        setUserData(data);
        //console.log("AuthProvider " + data);
        localStorage.setItem('auth', data)
      }, []);

      const setUserRole = useCallback((data) => {
        setUserRoleData(data);
        console.log("AuthProvider/Role-" + data);
        localStorage.setItem('role', data)
      }, []);

      useEffect(() => {
        if (localStorage.getItem('auth')) {
          setUser(localStorage.getItem('auth'))
          setUserRole(localStorage.getItem('role'))
        }
        setIsLoaded(true)
      }, []);

      const contextValue = useMemo(
        () => ({
          isLoaded,
          user,
          userRole,
          setUser,
          setUserRole,
          logOut,
        }),
        [isLoaded, user, userRole, setUserRole, logOut]
      );

  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  )
}