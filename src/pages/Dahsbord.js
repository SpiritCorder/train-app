import React from 'react'
import NavBar from '../components/NavBar'
import './dashbord.css';

export default function DashboardPage() {
  return (
    <div className='dashbord-container'>
        <div className="dashbord-navbar-row">
            <NavBar/>
        </div>

        <div className="dashbord-item-row">
            <div className="total ticket-box">
                <p>Total Tickets</p>
                <p className='dasbord-item-amount'>05</p>
            </div>

            <div className="total income-box">
                <p>Total Income</p>
                <p className='dasbord-item-amount'>05</p>
            </div>

            <div className="total passenger-box">
                <p>Total Passengers</p>
                <p className='dasbord-item-amount'>05</p>
            </div>
        </div>
        
    </div>
  )
}
