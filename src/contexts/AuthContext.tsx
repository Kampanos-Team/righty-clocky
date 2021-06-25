import { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";

import {auth, firebase} from "../services/firebase"

interface AuthContextData{
  signInWithGoogle: () => Promise<void>
  handleSignOut: () => Promise<void>
  user: User |undefined
}
type User = {
  id: string,
  name: string,
  avatar: string
}
interface AuthProviderProps{
  children: ReactNode;
}
export const authContext = createContext({} as AuthContextData)
export function AuthProvider({children} : AuthProviderProps){
  const [user, setUser]= useState<User>()


  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result  = await auth.signInWithPopup(provider)
      if(result.user){
        const {displayName, photoURL, uid} = result.user
        if(!displayName || !photoURL){
          throw new Error("Missing information")
        }
        setUser({id:uid, name:displayName, avatar: photoURL})
      }
      console.log(result)
    }

    const handleSignOut = async () => {
      await auth.signOut()
      setUser(undefined)
      console.log('User signed out!');
    }
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          const {displayName, photoURL, uid} = user
          if(!displayName || !photoURL){
            throw new Error("Missing information")
          }
          setUser({id:uid, name:displayName, avatar: photoURL})
        }
      })
      return () => {
        unsubscribe()
      }
    },[])
    return (
      <authContext.Provider value={{signInWithGoogle, user, handleSignOut}}>
      {children}
    </authContext.Provider>
    )

}