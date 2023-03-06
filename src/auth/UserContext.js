import React from 'react';

export const UserContext = React.createContext();

export function useCurrentUser() {
    console.log('usercontext', UserContext);
    return React.useContext(UserContext).useCurrentUser
}