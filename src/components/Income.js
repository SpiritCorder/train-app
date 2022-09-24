import {useState, useEffect} from 'react';
import {db} from '../config/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {Row, Col, ListGroup} from 'react-bootstrap';

import Loader from '../utils/Loader';

import './income.css';

const Income = () => {

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
                                                <Col>Ticket Price (per seat)</Col>
                                                <Col>{t.ticketPrice}</Col>
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
                                                <Col>Rs. {t.totalIncome.toFixed(2)}</Col>
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