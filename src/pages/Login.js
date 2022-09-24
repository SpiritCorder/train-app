import {useState, useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {auth} from '../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {db} from '../config/firebase';
import {doc, getDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import './login.css';

const LoginPage = () => {

    const navigate = useNavigate();

    const {auth: {user}, dispatch} = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        if(email.trim() === '' || password.trim() === '') {
            toast.error('Please enter both email and password');
            setLoading(false);
            return;
        }

        // eslint-disable-next-line
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Email address is not in valid format');
            setLoading(false);
            return;
        }

        // sign in the user with the help of firebase
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const authUserId = userCredentials.user.uid;

                // check wether the authenticated user is an admin
                return getDoc(doc(db, 'admins', authUserId))
            })
            .then(user => {
                
                // update the state
                dispatch({type: 'LOGIN_SUCCESS', payload: {id: user.id, ...user.data()}});

                if(user.data().isAdmin) {
                    toast.success('Login Success as admin');
                }
                setLoading(false);
                navigate('/');
            })
            .catch(err => {
                toast.error('Login failed, please try again');
                setLoading(false);
            })
     
    }

    return (

        user && user.isAdmin ? (<Navigate to='/' />) :
        
            <div className="loginContainer">
                <div className='formContainer'>
                    <h1 className='formTitle'>SIGN IN</h1>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Email address ...' value={email} onChange={e => setEmail(e.target.value)} />
                        <input type='password' placeholder='Password ...' value={password} onChange={e => setPassword(e.target.value)} />
                        <p>If you don't have an account <Link to='/register'>Register here</Link></p>
                        <div className='btnContainer'>
                            <button type='submit' className='btn-my' disabled={loading}>
                                {loading ? <i className="fa fa-spinner" aria-hidden="true"></i> : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        
    );
}

export default LoginPage;