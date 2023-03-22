import { Routes, Route } from "react-router-dom";
import { useCurrentUser } from "../auth/UserContext";


import EmployeeList from '../employee/EmployeeList';
import EmployeeLoginForm from "../auth/EmployeeLoginForm";
import CustomerLoginForm from "../auth/CustomerLoginForm";
import SignupEmployeeForm from "../auth/SignupEmployeeForm";
import SignupCustomerForm from "../auth/SignupCustomerForm";

function AppRoutes({employeeLogin, customerLogin, signupEmployee, signupCustomer, logout}){
    const currentUser = useCurrentUser();
    return(
        <div>
            <Routes>
            <Route path = '/employee/login' element = {<EmployeeLoginForm employeeLogin = {employeeLogin}/>}/>
            <Route path = '/customer/login' element = {<CustomerLoginForm customerLogin = {customerLogin}/>}/>
            <Route path = '/employee-signup' element = {<SignupEmployeeForm signupEmployee = {signupEmployee}/>}/>
            <Route path = '/customer-signup' element = {<SignupCustomerForm signupCustomer = {signupCustomer}/>}/>
            {currentUser.currentUser?(
            <Route to = '/login' element = {<EmployeeLoginForm employeeLogin = {employeeLogin}/>}/>
            ):(
                <Route path = '/employee/personel' element = {<EmployeeList/>}/>
                
            )}
            </Routes>
        </div>
    )
}
export default AppRoutes;