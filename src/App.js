import React, { useState, useEffect, useContext, createContext } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DeliveryApi from './api/api';
import useLocalStorage from './hooks/UseLocalStorage';
import LoadingSpinner from './common/LoadingSpinner';
import { UserContext } from './auth/UserContext';
import Navigation from './routes-nav/Navigation';
import AppRoutes from './routes-nav/AppRoutes';

export const TOKEN_STORAGE_ID = 'delivery-api-token';

function App() {
const[infoLoaded, setInfoLoaded] = useState(false);
const[currentUser, setCurrentUser] = useState(null);
const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

//const UserContext = createContext();

useEffect(
  function loadUserInfo(){
    async function getCurrentUser(){
      if(token){
        try{
          //put the token on the API class so it can be used to call the API
          DeliveryApi.token = token;
          console.log('test3', token);
          let currentUser = await DeliveryApi.getCurrentUser();
          console.log('currentUser', currentUser)
          setCurrentUser(currentUser)
        }catch(err){
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  },
  [token]
);

//handle sitewide logout
function logout(){
  setCurrentUser(null);
  setToken(null);
}

//handle sitewide signup
async function signup(signupData){
  try{
    let token = await DeliveryApi.signup(signupData);
    setToken(token);
    return{success:true};
  }catch(err){
    console.error('signup failed', err);
    return{
      success:false, err
    }
  }
}

//handle sitewide login
async function login(loginData){
  try{
    let token = await DeliveryApi.login(loginData);
    setToken(token);
    console.log('token', token);
    return{success:true};
  }catch(err){
    console.error('login failed', err);
  }
}

if(!infoLoaded) return <LoadingSpinner/>


  return (
     <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <div>
              <Navigation logout = {logout}/>
              <AppRoutes login = {login} signup = {signup}/>
            </div>
        </UserContext.Provider >
     </BrowserRouter>
  );
}

export default App;