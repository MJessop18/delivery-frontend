import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCurrentUser } from '../auth/UserContext';

//navigation bar for site shows up on every page
//when user is logged in it shows links to the main areas of the site
//shows link to login and sign up forms when logged out
//rendered by app

function Navigation({logout}){
    const currentUser = useCurrentUser();
    console.log('currenuser', currentUser);

    function LoggedInManager(){
        return(
            <ul>
                <li>
                    <NavLink to = '/'>
                        Pending orders
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Active orders
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Driver list
                    </NavLink>
                </li>
                <Link>
                    logout {currentUser.firstName}
                </Link>
            </ul>
        )
    }

    function LoggedInDriver(){
        return(
            <ul>
                <li>
                    <NavLink>
                        Pending orders
                    </NavLink>
                </li>
                <li>
                    <Link>
                        logout {currentUser.firstName}
                    </Link>
                </li>
            </ul>
        )
    }

    function LoggedOutNav(){
        return(
            <ul>
                <li>
                    <Link to = '/login'>
                        login
                    </Link>
                </li>
                <li>
                    <Link to = '/employee-signup'>
                        Sign up
                    </Link>
                </li>
            </ul>
        )
    }

    function LoggedInCustomer(){
        return (
            <ul>
                <li>
                    <NavLink>
                        New order
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Edit current order
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Edit profile
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        Order history
                    </NavLink>
                </li>
            </ul>
        )
    }

    return(
        <nav>
            <Link to ='/'>
                Polar Express
            </Link>
            {!currentUser?(
                <LoggedOutNav/>
            ):currentUser.role === 'manager'?(
                <LoggedInManager/>
            ):currentUser.role === 'driver'?(
                <LoggedInDriver/>
            ):(
                <LoggedInCustomer/>
            )}
        </nav>
    )
}
export default Navigation;