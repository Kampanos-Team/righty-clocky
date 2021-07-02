import { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";

import {auth, database, firebase} from "../services/firebase"

interface AuthContextData{
  signInWithGoogle: () => Promise<void>
  handleSignOut: () => Promise<void>
  signInWithEmailPassword: (email:string, password:string) => Promise<void>
  createUserWithEmailAndPassword: () => Promise<void>
  user: User |undefined
}
type User = {
  id: string,
  name: string,
  avatar: string,
  email: string | null
  phoneNumber: string |null
  completedTasks? : number
  taskInProgress?: string,
  timestampInProgress?: string
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
        const {displayName, photoURL, uid, email, phoneNumber} = result.user
        if(!displayName || !photoURL){
          throw new Error("Missing information")
        }
        setUser({id:uid, name:displayName, avatar: photoURL, email:email, phoneNumber: phoneNumber})
        const usersRef = database.ref('users').child(uid)
        usersRef.update({
          id:uid,
          name:displayName,
          avatar: photoURL,
          email:email,
          phoneNumber: phoneNumber,
      })
      }
    }

  async function signInWithEmailPassword(email:string, password:string) {
      // [START auth_signIn_password]
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          
          console.log(user)
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage)
        });
      // [END auth_signIn_password]
    }

  const createUserWithEmailAndPassword = async () => {
      const email = "bruno@kampanos.pt"
      const password = "Pa55w0rdKampan05"
      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = userCredentials.user
      console.log(user)
    }

  const handleSignOut = async () => {
      await auth.signOut()
      setUser(undefined)
      console.log('User signed out!');
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
        if(user){
          const {displayName, photoURL, uid} = user
          if(!displayName || !photoURL){
            throw new Error("Missing information")
          }
          const userRef = await database.ref('users').child(uid).get()
          const userData:User = userRef.val()
          setUser(userData)
        }
      })
      return () => {
        unsubscribe()
      }
    },[])
    
    return (
      <authContext.Provider value={{signInWithGoogle, user, handleSignOut, signInWithEmailPassword, createUserWithEmailAndPassword}}>
      {children}
    </authContext.Provider>
    )

}