import { useContext, useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import { database } from "../services/firebase";
import { authContext } from "./AuthContext";

interface CompanyContextData{

  company: Company |undefined
}
type Company = {
  id: string,
  name: string,
  avatar: string
}
interface CompanyProviderProps{
  children: ReactNode;
}
export const companyContext = createContext({} as CompanyContextData)
export function CompanyProvider({children} : CompanyProviderProps){
  const [company, setCompany]= useState<any>()
  const {user} = useContext(authContext)

    useEffect(() => {
        const fetchData = async ()=>{
          const querySnapshot = await database.collection('Company').where("name", "==", "Kampanos").get()
          setCompany(querySnapshot)
          console.log(querySnapshot.docs)
        }
        fetchData();
    }
    ,[])
    return (
      <companyContext.Provider value={{company}}>
      {children}
    </companyContext.Provider>
    )

}