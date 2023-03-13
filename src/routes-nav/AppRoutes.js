import { Routes, Route } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";


import EmployeeList from '../employee/EmployeeList';
import LoginForm from "../auth/LoginForm";
import SignupEmployeeForm from "../auth/SignupEmployeeForm";

function AppRoutes({login, signup, logout}){
    const currentUser = useCurrentUser();
    return(
        <div>
            <Routes>
            <Route path = '/login' element = {<LoginForm login = {login}/>}/>
            <Route path = '/employee-signup' element = {<SignupEmployeeForm signup = {signup}/>}/>
            {!currentUser === 'manager'?(
            <Route to = '/login' element = {<LoginForm login = {login}/>}/>
            ):(
                <Route to = '/employee/personel' element = {<EmployeeList/>}/>
            )}
            </Routes>
        </div>
    )
}
export default AppRoutes;