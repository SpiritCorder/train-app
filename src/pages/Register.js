import {useState, useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {auth} from '../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {db} from '../config/firebase';
import {doc, setDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import './login.css';

const RegisterPage = () => {

    const {auth: {user}} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        if(email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            toast.error('All fields are requried');
            setLoading(false);
            return;
        }

        // eslint-disable-next-line
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Email address is not in valid format');
            setLoading(false);
            return;
        }

        if(password !== confirmPassword) {
            toast.error('Passwords are not match');
            setLoading(false);
            return;
        }

        // create firebase user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const uid = userCredentials.user.uid;
                
                // add this user into admins collection with default isAdmin as false
                return setDoc(doc(db, 'admins', uid), {isAdmin: false});
            })
            .then(() => {
                toast.success('Registration Success');
                setLoading(false);
                navigate('/login');
            })
            .catch(err => {
                setLoading(false);
                toast.error('Registration failed. please try again');
            })

    }

    return (
        user && !user.isAdmin ? <Navigate to='/login' /> : user && user.isAdmin ? <Navigate to='/' /> :
            <div className="loginContainer">
                <div className='formContainer'>
                    <h1 className='formTitle'>SIGN UP</h1>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Email address ...' value={email} onChange={e => setEmail(e.target.value)} />
                        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                        <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        <p>If you already have an account <Link to='/login'>Login</Link></p>
                        <div className='btnContainer'>
                            <button className='btn-my'disabled={loading} >
                                {loading ? <i className="fa fa-spinner" aria-hidden="true"></i> : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        
    );
}

export default RegisterPage;