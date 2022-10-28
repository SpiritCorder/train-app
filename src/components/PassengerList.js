import {useEffect, useState} from 'react';
import {db} from '../config/firebase';
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import {Table, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import Loader from '../utils/Loader';

import './passengerList.css';

const PassengerList = () => {

    const navigate = useNavigate();

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

    const handleDelete = id => {
        // confirmation
        const val = window.confirm('Are you sure you want to delete this customer ? ');

        if(val) {
            // delete the user
            const docRef = doc(db, 'customers', id);

            deleteDoc(docRef)
                .then(() => {
                    // delete success
                    setPassengers(prev => prev.filter(p => p.id !== id))
                    toast.success('Customer deleted successfully');
                })
                .catch(err => {
                    toast.error('Customer could not delete, try again');
                })

        }
    }

    return (
       
        loading ? (<Loader />) : (
            <div className="passenger-list scrollable">
                {passengers.length === 0 && (
                    <h1 className='text-center'>No passengers registered yet</h1>
                )}
                {passengers.length > 0 && <h1 className='mb-5'>All Passengers</h1>}
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile No</th>
                            <th>Email</th>
                            <th>Total Bookings</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.length > 0 && passengers.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.firstName}</td>
                                <td>{p.lastName}</td>
                                <td>{p.phone}</td>
                                <td>{p.email}</td>
                                <td>{p.totalBookings}</td>
                                <td>
                                    <Button variant='primary' size='sm' style={{marginRight: '10px'}} onClick={() => navigate(`/passengers/${p.id}`)}>Update</Button>
                                    <Button variant='danger' size='sm' onClick={() => handleDelete(p.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
            </div>
             
        )
        
    );
}

export default PassengerList;