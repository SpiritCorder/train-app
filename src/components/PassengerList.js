import {useEffect, useState} from 'react';
import {db} from '../config/firebase';
import {collection, getDocs} from 'firebase/firestore';

import Loader from '../utils/Loader';

import './passengerList.css';

const PassengerList = () => {

    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const colRef = collection(db, 'customers');
        getDocs(colRef)
            .then(snapshot => {
                const data = [];
                snapshot.docs.forEach(doc => {
                    data.push({...doc.data(), id: doc.id});
                });
                setPassengers(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
            })
    }, []);

    return (
       
        loading ? (<Loader />) : (
            <div className="passenger-list scrollable">
                {passengers.length === 0 && (
                    <h1 className='text-center'>No passengers registered yet</h1>
                )}
                {passengers.length > 0 && <h1 className='mb-5'>All Passengers</h1>}
                {passengers.length > 0 && passengers.map(p => (
                    <div key={p.id} className='passenger-list-card mb-4'>
                        <h2>{p.name}</h2>
                    </div>
                ))}
            </div>
        )
        
    );
}

export default PassengerList;