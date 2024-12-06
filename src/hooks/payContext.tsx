import React, { createContext, useContext, useState,ReactNode,Dispatch,SetStateAction } from "react";

interface ApiContextType{
    payAction:Function|null;
    setPayAction:Dispatch<SetStateAction<Function|null>>
}

const ApiContext=createContext<ApiContextType|undefined>(undefined)



export const ApiProvider:React.FC<{children:ReactNode}>=({children})=>{
    //Manage the state for the pay button action
    const [payAction,setPayAction]=useState<Function|null>(null)
   return(
    <ApiContext.Provider value={{payAction,setPayAction}}>
        {children}
    </ApiContext.Provider>
   )
}


//custom hook to use the apiContext in any component

export const useApiContext=():ApiContextType=>{
    const context=useContext(ApiContext)
    if(!context){
        throw new Error('use Api Context must be used within an apiProvider')
    }
    return context
}