import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import './navbar.css';

export default function NavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // logout current user
    localStorage.removeItem('loggedInUser');

    toast.success('Logout Success');

    // redirect to login page
    navigate('/login');

  }

  return (
    <div className='nav-bar-container'>
        <div className="nav-bar-topic">
            <h2>Train Ticket<br/>Booking</h2>
        </div>

        <div className="nav-bar-item-list">

            <ul>
                <Link to='#' className='active'><li>Dashbord</li></Link>
                <Link to='#'><li>Total Tickets</li></Link>
                <Link to='#'><li>Total Income</li></Link>
                <Link to='#'><li>Passenger Information</li></Link>
                <Link to='#'><li>Change Shedule</li></Link>
                <Link to='#'><li>Add Train</li></Link>
                <button onClick={handleLogout}><li>Log Out</li></button>
            </ul>
        </div>

    </div>
  )
}
