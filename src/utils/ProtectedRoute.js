import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // check wether the user has logged in or not
        const isLoggedIn = localStorage.getItem('loggedInUser') ? localStorage.getItem('loggedInUser') : null;

        if(!isLoggedIn) {
            // redirect to the login page
            navigate('/login');
        } else {
            setLoading(false);
        }
    }, [navigate]);

    return (
        loading ? (
            <p>Loading...</p>
        ) : (
            children
        )
    );
}

export default ProtectedRoute;