import React from 'react'
import BaseLayout from '../utils/BaseLayout';
import './dashbord.css';

export default function DashboardPage() {

    const content = (
      
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
       
    )


  return  <BaseLayout children={content} />
    
}
