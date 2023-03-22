import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../common/Alert';

function SignupCustomerForm({signupCustomer}){
    let navigate = useNavigate();

    const[formData, setFormData] = useState({
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        phoneNumber:''
    });
    const[formErrors, setFormErrors] = useState([])

    //handle form submit
    async function handleSubmit(evt){
        const{
            email,
            password,
            firstName:first_name,
            lastName:last_name,
            phoneNumber:phone_number
        } = formData
        {
            const formSafe = {email, password, first_name, last_name, phone_number};
            evt.preventDefault();
            let result = await signupCustomer(formSafe);
            if(result.success){
                navigate('/customer/pending');
            }else{
                setFormErrors(result.errors)
            }
        }
    }
    function handleBack(){
        navigate('/customer/personel')
    }
    function handleChange(evt){
        const {name, value} = evt.target
        setFormData(data => ({...data,[name]:value}))
    }

    return(
        <div>
            <div>
                <h2>
                    Customer Signup
                </h2>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label>
                            email
                        </label>
                        <input
                        name='email'
                        required='required'
                        minLength='5'
                        value={formData.email}
                        onChange={handleChange}/>
                    </div>
                    <div>
                    <label>
                            password
                        </label>
                        <input
                        name='password'
                        required='required'
                        type='password'
                        minLength='8'
                        value={formData.password}
                        onChange={handleChange}/>
                    </div>
                    <div>
                    <label>
                            First Name
                        </label>
                        <input
                        name='firstName'
                        required='required'
                        minLength='2'
                        value={formData.firstName}
                        onChange={handleChange}/>
                    </div>
                    <div>
                    <label>
                            Last Name
                        </label>
                        <input
                        name='lastName'
                        required='required'
                        minLength='2'
                        value={formData.lastName}
                        onChange={handleChange}/>
                    </div>
                    <div>
                    <label>
                            Phone number
                        </label>
                        <input
                        name='phoneNumber'
                        required='required'
                        minLength='10'
                        maxLength='16'
                        value={formData.phoneNumber}
                        onChange={handleChange}/>
                    </div>
                    {formErrors.length?(
                        <Alert type='danger' messages={formErrors}/>
                    ):null}
                    <button type='submit' onSubmit={handleSubmit}>
                        Submit
                    </button>
                    <button onClick={handleBack}>
                        Back
                    </button>
                </form>
            </div>
        </div>
    )
}
export default SignupCustomerForm;