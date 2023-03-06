import React from 'react';
import EmployeeCard from './EmployeeCard';

//show list of all employee cards

function EmployeeCardList({employees}){
    return(
        <div>
            <h2> Employee List </h2>
            {employees.map((employee) => (
                <EmployeeCard
                key = {employee.id}
                id = {employee.id}
                firstName = {employee.firstName}
                lastName = {employee.lastName}
                role = {employee.role}
                />
            ))}
        </div>
    )
}

export default EmployeeCardList;