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
          let currentUser = await DeliveryApi.getCurrentUser();
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

//handle sitewide employee signup
async function signupEmployee(signupData){
  try{
    let token = await DeliveryApi.signupEmployee(signupData);
    setToken(token);
    return{success:true};
  }catch(err){
    console.error('signup failed', err);
    return{
      success:false, err
    }
  }
}

//handle sitewide customer signup
async function signupCustomer(signupData){
  try{
    let token = await DeliveryApi.signupCustomer(signupData);
    setToken(token);
    return{success:true};
  }catch(err){
    console.error('signup failed', err);
    return{
      success:false, err
    }
  }
}

//handle sitewide employee login
async function employeeLogin(loginData){
  try{
    let token = await DeliveryApi.employeeLogin(loginData);
    setToken(token);
    return{success:true};
  }catch(err){
    console.error('login failed', err);
  }
}

//handle sitewide customer login
async function customerLogin(loginData){
  try{
    let token = await DeliveryApi.customerLogin(loginData);
    setToken(token);
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
              <AppRoutes employeeLogin = {employeeLogin} customerLogin = {customerLogin} signupEmployee = {signupEmployee} signupCustomer = {signupCustomer}/>
            </div>
        </UserContext.Provider >
     </BrowserRouter>
  );
}

export default App;