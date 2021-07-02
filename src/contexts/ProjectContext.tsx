import { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";

import {auth, database, firebase} from "../services/firebase"

interface AuthContextData{

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
  
    return (
      <authContext.Provider value={{}}>
      {children}
    </authContext.Provider>
    )

}