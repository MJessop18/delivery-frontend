import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../common/Alert';

//login form
function EmployeeLoginForm({employeeLogin}){
    let navigate = useNavigate()
    const[formData, setFormData] = useState({
        email:'',
        password:''
    });
    const[formErrors, setFormErrors] = useState([])

    async function handleSubmit(evt){
        evt.preventDefault()
        console.log('form',formData)
        let result = await employeeLogin(formData);
        if(result.success){
            navigate('/')
        }else{
            setFormErrors(result.errors)
        }
    }
    function handleChange(evt){
        const{name, value} = evt.target;
        setFormData((l) => ({...l, [name]:value}))
    }

    return(
        <div>
            <div>
                <h3>
                    login
                </h3>
                <div className='card'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>
                                    Email
                                </label>
                                <input 
                                name='email'
                                className = 'form-control'
                                value={formData.email}
                                onChange = {handleChange}
                                autoComplete = 'email'
                                required/>
                            </div>
                            <div className='form-group'>
                                <label>
                                    Password
                                </label>
                                <input 
                                type = 'password'
                                name='password'
                                className = 'form-control'
                                value={formData.password}
                                onChange = {handleChange}
                                autoComplete = 'password'
                                required/>
                            </div>
                            {formErrors.length ? (
                                <Alert type='danger' messages={formErrors}/>
                            ):null}
                            <button onSubmit={handleSubmit}>
                                Driver login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EmployeeLoginForm;