import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import './login.css';

const RegisterPage = () => {

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
        const confirmPassword = e.target[2].value;

        if(username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            toast.error('All fields are requried');
            return;
        }

        if(password !== confirmPassword) {
            toast.error('Passwords are not match');
            return;
        }

        // assume that user registration success
        const user = {
            username,
            password
        }

        const users = localStorage.getItem('registeredUsers') ? JSON.parse(localStorage.getItem('registeredUsers')) : [];

        users.push(user);

        localStorage.setItem('registeredUsers', JSON.stringify(users));

        toast.success('Registration Success');

        // registration success user saved in the database therefore redirect to login page
        navigate('/login');
    }

    return (
        loading ? (<p>Loading...</p>) : (
            <div className="loginContainer">
                <div className='formContainer'>
                    <h1 className='formTitle'>SIGN UP</h1>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Username' />
                        <input type='password' placeholder='Password' />
                        <input type='password' placeholder='Confirm Password' />
                        <p>If you already have an account <Link to='/login'>Login</Link></p>
                        <div className='btnContainer'>
                            <button className='btn'>SIGN UP</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default RegisterPage;