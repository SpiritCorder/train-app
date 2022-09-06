import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import './login.css';

const LoginPage = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedInUser') ? localStorage.getItem('loggedInUser') : null;

        if(isLoggedIn) {
            // redirect to the dashboard page
            navigate('/');
        } else {
            setLoading(false);
        }
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        const username = e.target[0].value;
        const password = e.target[1].value;

        if(username.trim() === '' || password.trim() === '') {
            toast.error('All fields are required');
            return;
        }

        const users = localStorage.getItem('registeredUsers') ? JSON.parse(localStorage.getItem('registeredUsers')) : [];

        // find the user has already registered
        const userExist = users.find(user => user.username === username && user.password === password);

        if(userExist) {
            // login successfull redirect to the dashboard after setting user in localstorage

            localStorage.setItem('loggedInUser', username);

            toast.success('Login Success');
            navigate('/');
        } else {
            // no user found with given credentials
            toast.error('User not found with the email or password');
        }   
        
    }

    return (
        loading ? (<p>Loading...</p>) : (
            <div className="loginContainer">
                <div className='formContainer'>
                    <h1 className='formTitle'>SIGN IN</h1>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Username' />
                        <input type='password' placeholder='Password' />
                        <p>If you don't have an account <Link to='/register'>Register here</Link></p>
                        <div className='btnContainer'>
                            <button type='submit' className='btn'>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default LoginPage;