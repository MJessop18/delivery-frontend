import { Routes, Route } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";


import EmployeeList from '../employee/EmployeeList';
import LoginForm from "../auth/LoginForm";
import SignupEmployeeForm from "../auth/SignupEmployeeForm";

function AppRoutes({login, signup, logout}){
    const currentUser = useCurrentUser();
    console.log('currentuser1000', currentUser)
    return(
        <div>
            <Routes>
            <Route path = '/login' element = {<LoginForm login = {login}/>}/>
            <Route path = '/employee-signup' element = {<SignupEmployeeForm signup = {signup}/>}/>
            {currentUser.currentUser?(
            <Route to = '/login' element = {<LoginForm login = {login}/>}/>
            ):(
                <Route path = '/employee/personel' element = {<EmployeeList/>}/>
                
            )}
            </Routes>
        </div>
    )
}
export default AppRoutes;