import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {db} from '../config/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {Row, Col, ListGroup, Button} from 'react-bootstrap';

import Loader from '../utils/Loader';

import './income.css';

const Income = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [trains, setTrains] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);

    useEffect(() => {

        const colRef = collection(db, 'trains');
        getDocs(colRef)
            .then(snapshot => {
                const trainsInfo = [];
                let totalI = 0;
                let totalB = 0;

                snapshot.docs.forEach(doc => {
                    const document = doc.data();
                    trainsInfo.push({...document, id: doc.id});
                    totalI += document.totalIncome;
                    totalB += document.totalBookings;
                })

                setTrains(trainsInfo);
                setTotalIncome(totalI);
                setTotalBookings(totalB);
                setLoading(false);

            })
            .catch(err => {
                console.log(err.message)
                setLoading(false);
            })

    }, []);

    return (
        loading ? (<Loader />) : (
            <div className='income scrollable'>
                <h1>Total Income</h1>
                <hr></hr>
                <Row className='mt-5'>
                    <Col md={6}>
                        {trains.length > 0 && trains.map(t => (
                            <div key={t.id}>
                                <div className='income-card'>
                                    <h2 className='mb-4'>{t.title}</h2>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total seats booked in first class</Col>
                                                <Col>{t.bookedSeatsFirstClass}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>First class ticket price (per seat)</Col>
                                                <Col>LKR. {t.firstClass?.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total seats booked in second class</Col>
                                                <Col>{t.bookedSeatsSecondClass}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Second class ticket price (per seat)</Col>
                                                <Col>LKR. {t.secondClass?.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total Bookings</Col>
                                                <Col>{t.totalBookings}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total Income</Col>
                                                <Col>LKR. {t.totalIncome.toFixed(2)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>View Bookings</Col>
                                                <Col>
                                                    <Button variant='primary' onClick={() => navigate(`/trains/bookings/${t.id}`)}>Bookings</Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    
                                </div>
                                <hr></hr>
                            </div>    
                            
                        ))}
                    </Col>
                    <Col md={6}>
                        <ListGroup>
                            <ListGroup.Item><h2 className='text-center'>Overall Stats</h2></ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col><h4>Overall Bookings</h4></Col>
                                    <Col><h4>{totalBookings}</h4></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><h4>Overall Income</h4></Col>
                                    <Col><h4>Rs. {totalIncome.toFixed(2)}</h4></Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                
            </div>
        )
    );
}

export default Income;