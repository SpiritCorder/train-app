import useAuth from '../hooks/useAuth';
import {signOut} from 'firebase/auth';
import {auth} from '../config/firebase';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import './navbar.css';

export default function NavBar({active}) {

  const {dispatch} = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // signout success
        toast.success('Signout success');
        // remove auth user from the state
        dispatch({type: 'LOGOUT_SUCCESS'});
        navigate('/login');
      })
      .catch(err => {
        // signout failed
        toast.error('Failed to signout, please try again');
      })

  }

  return (
    <div className='nav-bar-container'>
        <div className="nav-bar-topic">
            <h2>Train Ticket<br/>Booking</h2>
        </div>

        <div className="nav-bar-item-list">

            <ul>
                <Link to='/' className={active === 'dashboard' ? 'active' : ''}><li>Dashbord</li></Link>
                <Link to='/trains/add-train' className={active === 'add-train' ? 'active' : ''}><li>Add Train</li></Link>
                <Link to='/trains' className={active === 'trains' ? 'active' : ''}><li>Train Details</li></Link>
                <Link to='/passengers' className={active === 'passenger' ? 'active' : ''}><li>Passenger Information</li></Link>
                <Link to='/income' className={active === 'income' ? 'active' : ''}><li>All Incomes</li></Link>
                
                <button onClick={handleLogout}><li>Log Out</li></button>
            </ul>
        </div>

    </div>
  )
}
