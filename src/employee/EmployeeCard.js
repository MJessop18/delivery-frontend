import React from 'react';
import { Link } from 'react-router-dom';

//show info on employee
//is rendered by employee card list to show a card for each employee
//employeeList -> employeeCardList -> employeeCard

function EmployeeCard({id:empId, email, firstName, lastName, role}){
    return(
        <div>
            <Link className='' to = {`/employee/${empId}`}>
                <div>
                    <h6>
                        First Name:{firstName} Last Name:{lastName} Role:{' '} 
                        {role?role:'inactive'}
                    </h6>
                </div>
            </Link>
        </div>
    )
}

export default EmployeeCard;