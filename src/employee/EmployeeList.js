import React, { useState, useEffect } from 'react';
import DeliveryApi from '../api/api';
import EmployeeCardList from './EmployeeCardList';
import LoadingSpinner from '../common/LoadingSpinner';
import { NavLink } from 'react-router-dom';
//import { getSearchParamsForLocation } from 'react-router-dom/dist/dom';

//show page with list of employees
//on mount loads employees from API
//route into /employees

function employeeList(){
    const [employees, setEmployees] = useState(null);

    useEffect(function getEmployeesOnMount(){
        search();
    },[]);

    async function search(){
        let employeeList = await DeliveryApi.getEmployees();
        setEmployees(employeeList)
    }

    if(!employees) return <LoadingSpinner/>
    return(
        <div>
            <div>
                {employees.length?(
                    <EmployeeCardList employees = {employees}/>
                ):(
                    <p>No employees were found</p>
                )}
                <NavLink
                to = {`/employee/personel/new`}>
                    New employee
                </NavLink>
            </div>
        </div>
    )
}
export default employeeList;