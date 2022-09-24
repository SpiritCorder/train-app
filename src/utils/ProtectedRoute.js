import {useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {Navigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const ProtectedRoute = ({children}) => {

    const {auth: {user}} = useContext(AuthContext);

    const notifyNotAdmin = () => {
        toast.error('Sorry your not an admin');
        
        return <Navigate to='/login' />
    }

    return (

        !user ? <Navigate to='/login' /> : (user && !user.isAdmin) ? notifyNotAdmin() : (user && user.isAdmin) && children
    );
}

export default ProtectedRoute;