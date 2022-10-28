import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {db} from '../config/firebase';
import {collection, doc, deleteDoc, onSnapshot, getDoc, setDoc} from 'firebase/firestore';
import Loader from '../utils/Loader';
import {Table, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import './trainList.css';

const TrainList = () => {

    const navigate = useNavigate();

    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const colRef = collection(db, 'trains');

        const unsub = onSnapshot(colRef, snapshot => {
            const data = [];
            snapshot.docs.forEach(doc => {
                data.push({...doc.data(), id: doc.id});
            })
            setTrains(data);
            setLoading(false);
        })

        return () => unsub();

    }, []);

    console.log(trains);

    // const renderCardContent = t => {
    //     const card = (
    //         <>
    //           <CardContent>
    //             {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //               Word of the Day
    //             </Typography> */}
    //             <Typography variant="h5" component="div">
    //               {t.title}
    //             </Typography>
    //             <ul className='train-list-train-data'>
    //                 <li>
    //                     <p className='train-list-train-data-left'>Start Point : </p>
    //                     <p className='train-list-train-data-right'>{t.startPoint}</p>
    //                 </li>
    //                 <li>
    //                     <p className='train-list-train-data-left'>End Point : </p>
    //                     <p className='train-list-train-data-right'>{t.endPoint}</p>
    //                 </li>
    //                 <li>
    //                     <p className='train-list-train-data-left'>Departure Time : </p>
    //                     <p className='train-list-train-data-right'>{t.startTime}</p>
    //                 </li>
    //                 <li>
    //                     <p className='train-list-train-data-left'>Arrival Time : </p>
    //                     <p className='train-list-train-data-right'>{t.endTime}</p>
    //                 </li>
    //                 <li>
    //                     <p className='train-list-train-data-left'>First Class Total Seats : </p>
    //                     <p className='train-list-train-data-right'>{t.firstClass?.seats}</p>
    //                 </li>
    //                 <li>
    //                     <p className='train-list-train-data-left'>First Class Ticket Price (per seat) : </p>
    //                     <p className='train-list-train-data-right'>{`Rs. ${t.firstClass?.price}`}</p>
    //                 </li>
    //                 <li>
    //                     <p className='train-list-train-data-left'>Second Class Total Seats : </p>
    //                     <p className='train-list-train-data-right'>{t.secondClass?.seats}</p>
    //                 </li>
    //                 <li>
    //                     <p className='train-list-train-data-left'>Second Class Ticket Price (per seat) : </p>
    //                     <p className='train-list-train-data-right'>{`Rs. ${t.secondClass?.price}`}</p>
    //                 </li>
    //             </ul>
    //           </CardContent>
    //           <CardActions>
    //             <Button size="small" onClick={e => navigate(`/trains/bookings/${t.id}`)}>View Bookings</Button>
    //           </CardActions>
    //         </>
    //       );

    //       return card;
    // }

    const handleDelete = id => {
        const val = window.confirm('Are you sure that you want to delete this train ? ');

        if(val) {
            // delete the train
            const docRef = doc(db, 'trains', id);
            deleteDoc(docRef)
                .then(() => {
                    toast.success('train deleted')
                    // update the train count in counts collection
                    getDoc(doc(db, 'counts', 'total-train-count'))
                        .then(snapshot => {
                            const currentCount = snapshot.data().count;
                            return setDoc(doc(db, 'counts', 'total-train-count'), {count: currentCount - 1});
                        })
                        .then(() => {
                            
                        })
                        .catch(err => {
                            console.log(err.message)
                        })
                })
                .catch(err => toast.error('Train delete failed, try again'))
        }
    }

    return (
        loading ? (<Loader />) : (
            <div className='train-list scrollable'>
                <h1>Train Details</h1>
                <hr></hr>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Name</th>
                            <th>Start Point</th>
                            <th>End Point</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>First Class</th>
                            <th>Second Class</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trains.length > 0 && trains.map(t => (
                            <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.title}</td>
                                <td>{t.startPoint}</td>
                                <td>{t.endPoint}</td>
                                <td>{t.startTime}</td>
                                <td>{t.endTime}</td>
                                <td className='train-info'>
                                    <p className=''>Seats : {t.firstClass?.seats}</p>
                                    <p className=''>Price (per seat) : Rs.{t.firstClass?.price}</p>
                                </td>
                                <td className='train-info'>
                                    <p className=''>Seats : {t.secondClass?.seats}</p>
                                    <p className=''>Price (per seat) : Rs.{t.secondClass?.price}</p>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center gap-1'>
                                        <Button variant='primary' size='sm'  onClick={() => navigate(`/trains/bookings/${t.id}`)} >Bookings</Button>
                                        <Button variant='secondary' size='sm' onClick={() => navigate(`/trains/add-train?edit=true&id=${t.id}`)}>Update</Button>
                                        <Button variant='danger' size='sm' onClick={() => handleDelete(t.id)}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* {trains.map(t => (
                    <Box sx={{ minWidth: 275, marginBottom: '20px' }} key={t.id} >
                        <Card variant="outlined">{renderCardContent(t)}</Card>
                    </Box>
                ))} */}
            </div>
        )
    );
}

export default TrainList;