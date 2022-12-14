import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {query, where, getDoc, getDocs, doc, collection} from 'firebase/firestore';
import {db} from '../config/firebase';

import {Row, Col, ListGroup} from 'react-bootstrap';
import Loader from '../utils/Loader';

import './trainBookings.css';


const TrainBookings = () => {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [train, setTrain] = useState({});
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalIncome: 0.00,
        totalBookedSeats: 0
    });

    useEffect(() => {
        const trainId = params.trainId;

        const docRef = doc(db, 'trains', trainId);
        const colRef = collection(db, 'bookings');
        let trainInfo = {};
        const bookingsInfo = [];
        getDoc(docRef)
            .then(trainDoc => {
                trainInfo = {...trainDoc.data()};
               
                const q = query(colRef, where("trainId", "==", trainId.trim().toString()));
                return getDocs(q);  
            })
            .then(bookingsDocs => {
              
                const statInfo = {
                    totalBookings: 0,
                    totalIncome: 0,
                    totalBookedSeats: 0
                }
                bookingsDocs.docs.forEach(b => {
                    statInfo.totalBookings++;
                    
                    const current = b.data();

                    statInfo.totalIncome += (+current.bookings?.firstClass?.total || 0) + ((+current.bookings?.secondClass?.total || 0))
                    statInfo.totalBookedSeats += (+current.bookings?.firstClass?.seats || 0) + ((+current.bookings?.secondClass?.seats || 0));

                    bookingsInfo.push({...current, id: b.id});
                })
                
                setStats(statInfo);
                setTrain(trainInfo);
                setBookings(bookingsInfo);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err.message);
            })


    }, [params.trainId]);


    return (
        loading ? (<Loader />) : (
            <div className='train-bookings scrollable'>
                <Row className="mb-5">
                    <Col>
                        <h1>{train.title}</h1>
                        <div>
                            <p>First Class Seats : {train.firstClass?.seats}</p>
                            <p>First Class ticket price (per seat) : {train.firstClass?.price}</p>
                        </div>
                        <div>
                            <p>Second Class Seats : {train.secondClass?.seats}</p>
                            <p>Second Class ticket price (per seat) : {train.secondClass?.price}</p>
                        </div>
                        <hr></hr>
                    </Col>
                </Row>
                {bookings.length === 0 && (
                    <Row>
                        <Col>
                            <h2>No Bookings yet</h2>
                        </Col>
                    </Row>
                )}

                {bookings.length > 0 && (
                    <Row>
                        <Col md={6}>
                            <h2 className='mb-4'>All Bookings</h2>
                            {bookings.map(booking => (
                                <div key={booking.id} className='mb-4'>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Bokking ID</Col>
                                                <Col>{booking.id}</Col>
                                            </Row> 
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Customer ID</Col>
                                                <Col>{booking.customerId}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Train ID</Col>
                                                <Col>{booking.trainId}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {booking.bookings.firstClass && (
                                            <>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Num of seats booked in first class</Col>
                                                        <Col>{booking.bookings.firstClass?.seats}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Total ticket price for first class</Col>
                                                        <Col>LKR. {booking.bookings.firstClass?.total}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </>
                                        )}
                                        {booking.bookings.secondClass && (
                                            <>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Num of seats booked in second class</Col>
                                                        <Col>{booking.bookings.secondClass?.seats}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Total ticket price for second class</Col>
                                                        <Col>LKR. {booking.bookings.secondClass?.total}</Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </>
                                        )}
                                        
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total </Col>
                                                <Col>LKR. {(booking.bookings.firstClass?.total || 0) + (booking.bookings.secondClass?.total || 0)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <hr></hr>
                                </div>  
                            ))}
                        </Col>
                        <Col md={6}>
                            <h2 className='mb-4 text-center'>Booking Stats</h2>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Bookings</Col>
                                        <Col>{stats.totalBookings}</Col>
                                    </Row> 
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Seats Booked</Col>
                                        <Col>{stats.totalBookedSeats}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Remaining Seats</Col>
                                        <Col>{((+train.firstClass?.seats || 0) + (+train.secondClass?.seats || 0)) - stats.totalBookedSeats}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Income</Col>
                                        <Col>Rs. {stats.totalIncome.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                )}
                
            </div>
        )
    );
}

export default TrainBookings;