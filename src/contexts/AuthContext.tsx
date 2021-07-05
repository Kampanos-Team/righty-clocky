import { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import { useHistory } from "react-router-dom";
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
  name?: string | null,
  avatar?: string | null,
  email: string | null
  phoneNumber: string |null
  completedTasks? : number
  taskInProgress?: string,
  timestampInProgress?: string
  provider?: string | undefined
}
interface AuthProviderProps{
  children: ReactNode;
}
export const authContext = createContext({} as AuthContextData)
export function AuthProvider({children} : AuthProviderProps){
  const [user, setUser]= useState<User>()
  const history = useHistory()

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result  = await auth.signInWithPopup(provider)
      if(result.user){
        const {displayName, photoURL, uid, email, phoneNumber} = result.user
        if(!displayName || !photoURL){
          throw new Error("Missing information")
        }
        setUser({id:uid, name:displayName, avatar: photoURL, email:email, phoneNumber:phoneNumber, provider:"google"})
        const usersRef = database.ref('users').child(uid)
        usersRef.update({
          id:uid,
          name:displayName,
          avatar: photoURL,
          email:email,
          phoneNumber: phoneNumber,
          provider: "google"
      })
      }
    }
  const signInWithEmailPassword = async (email:string, password:string) => {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
          // Signed in
        if(userCredential.user){
          const {displayName, photoURL, uid, email, phoneNumber} = userCredential.user;
          const usersRef = database.ref('users').child(uid)
          usersRef.update({
            id:uid,
            email:email,
            phoneNumber: phoneNumber,
        })
          setUser({id:uid, name:displayName, avatar: photoURL, email:email, phoneNumber: phoneNumber})
          history.push("/dashboard")
          }
      } catch (error) {
        const errorMessage = error.message;
        throw console.error(errorMessage)
      }
      // [END auth_signIn_password]
    }

  const createUserWithEmailAndPassword = async () => {
      const email = ""
      const password = "kampanos"
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
          const {uid} = user
          const userRef = await database.ref('users').child(uid).get()
          const userData:User = userRef.val()
          setUser(userData)
        }
        if(!user){
          history.push("/")
        }
      })
      return () => {
        unsubscribe()
      }
    },[history])
    
    return (
    <authContext.Provider value={{signInWithGoogle, user, handleSignOut, signInWithEmailPassword, createUserWithEmailAndPassword}}>
      {children}
    </authContext.Provider>
    )

}