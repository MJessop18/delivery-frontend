import { createContext, useContext } from "react";

export const UserContext = createContext({});

export function useCurrentUser(){
    console.log('usercon', useContext (UserContext))
    return useContext(UserContext);
    
}