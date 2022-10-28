import {useContext} from 'react';
import {AuthContext} from '../context/authContext';

const useAuth = () => {

    const {auth, dispatch} = useContext(AuthContext);

    return {auth, dispatch};
}

export default useAuth;