// import React from 'react';

// export const UserContext = React.createContext();

// export function useCurrentUser() {
//     console.log('usercontext', (UserContext).useCurrentUser);
//     return React.useContext(UserContext).useCurrentUser
// }

import { createContext, useContext } from "react";

export const UserContext = createContext({});

export function useCurrentUser(){
    return useContext(UserContext);
}