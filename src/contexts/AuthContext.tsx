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
  avatar: string
}
interface AuthProviderProps{
  children: ReactNode;
}
export const authContext = createContext({} as AuthContextData)
export function AuthProvider({children} : AuthProviderProps){
  const [user, setUser]= useState<User>()


  const handleCreateUser = async () => {

  }
  const company = "kampanos"

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
      // const userRef = database.ref("users");

      // const newUser = await userRef.push({
      //   avatar: result.user?.photoURL,
      //   name: result.user?.displayName,
      //   email: result.user?.email,
      //   company: company

      // })
      // history.push(`/admin/rooms/${firebaseRoom.key}`)
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
      <authContext.Provider value={{signInWithGoogle, user, handleSignOut, signInWithEmailPassword, createUserWithEmailAndPassword}}>
      {children}
    </authContext.Provider>
    )

}