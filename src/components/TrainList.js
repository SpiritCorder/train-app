import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {db} from '../config/firebase';
import {collection, getDocs} from 'firebase/firestore';
import Loader from '../utils/Loader';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './trainList.css';

const TrainList = () => {

    const navigate = useNavigate();

    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const colRef = collection(db, 'trains');
        getDocs(colRef)
            .then(snapshot => {
                const data = [];
                snapshot.docs.forEach(doc => {
                    data.push({...doc.data(), id: doc.id});
                })
                setTrains(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
            })

    }, []);

    const renderCardContent = t => {
        const card = (
            <>
              <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography> */}
                <Typography variant="h5" component="div">
                  {t.title}
                </Typography>
                <ul className='train-list-train-data'>
                    <li>
                        <p className='train-list-train-data-left'>Start Point : </p>
                        <p className='train-list-train-data-right'>{t.startPoint}</p>
                    </li>
                    <li>
                        <p className='train-list-train-data-left'>End Point : </p>
                        <p className='train-list-train-data-right'>{t.endPoint}</p>
                    </li>
                    <li>
                        <p className='train-list-train-data-left'>Departure Time : </p>
                        <p className='train-list-train-data-right'>{t.startTime}</p>
                    </li>
                    <li>
                        <p className='train-list-train-data-left'>Arrival Time : </p>
                        <p className='train-list-train-data-right'>{t.endTime}</p>
                    </li>
                    <li>
                        <p className='train-list-train-data-left'>Total Seats : </p>
                        <p className='train-list-train-data-right'>{t.totalSeats}</p>
                    </li>
                    <li>
                        <p className='train-list-train-data-left'>Ticket Price (per seat) : </p>
                        <p className='train-list-train-data-right'>{`Rs. ${t.ticketPrice}`}</p>
                    </li>
                </ul>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={e => navigate(`/trains/bookings/${t.id}`)}>View Bookings</Button>
              </CardActions>
            </>
          );

          return card;
    }

    return (
        loading ? (<Loader />) : (
            <div className='train-list scrollable'>
                <h1>Train Details</h1>
                <hr></hr>
                {trains.map(t => (
                    <Box sx={{ minWidth: 275, marginBottom: '20px' }} key={t.id} >
                        <Card variant="outlined">{renderCardContent(t)}</Card>
                    </Box>
                ))}
            </div>
        )
    );
}

export default TrainList;