import {createContext, useReducer, useEffect} from 'react';
import {auth} from '../config/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {db} from '../config/firebase';
import {doc, getDoc} from 'firebase/firestore';

import Loader from '../utils/Loader';

export const AuthContext = createContext();

const initState = {
    authStateLoading: true,
    user: null
}

const authReducer = (state=initState, action) => {
    switch(action.type) {
        case 'AUTH_CHECK_SUCCESS':
            return {...state, authStateLoading: false, user: action.payload};
        case 'AUTH_CHECK_FAIL':
            return {...state, authStateLoading: false};
        case 'LOGIN_SUCCESS':
            return {...state, user: action.payload};
        case 'LOGOUT_SUCCESS':
            return {...state, user: null};
        default:
            return state;
    }
}

const AuthProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, initState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                getDoc(doc(db, 'admins', user.uid))
                    .then(userInfo => {
                        // already authenticated
                        dispatch({type: 'AUTH_CHECK_SUCCESS', payload: {id: userInfo.id, ...userInfo.data()}});
                    })
                    .catch(err => {
                        console.log(err.message)
                    })   
            } else {
                dispatch({type: 'AUTH_CHECK_FAIL'});
            }
        })
    }, []);

    return (
        authState.authStateLoading ? (
            <div style={{width: '100vw', height: '100vh'}}>
                <Loader />
            </div>
        ) : (
            <AuthContext.Provider value={{auth: authState, dispatch}}>
                {children}
            </AuthContext.Provider>
        )
    );
}

export default AuthProvider;