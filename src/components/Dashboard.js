import {useState, useEffect} from 'react';
import {db} from '../config/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {Row, Col} from 'react-bootstrap';

import Loader from '../utils/Loader';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

import './dashboard.css';

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [trainsData, setTrainsData] = useState([]);
    const [trainCount, setTrainCount] = useState(0);

    useEffect(() => {
        const colRef = collection(db, 'trains');
        let data = [];
        getDocs(colRef)
            .then(snapshot => {
                
                snapshot.docs.forEach(doc => {
                    const document = {...doc.data(), id: doc.id};
                    data.push({
                        name: document.title,
                        income: document.totalIncome,
                        bookings: document.totalBookings
                    });
                })

                return getDocs(collection(db, 'counts'))
                
            })
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if(doc.id === 'total-train-count') {
                        setTrainCount(doc.data().count);
                    }
                })

                setTrainsData(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
            })
    }, []);
    


    return (
        loading ? (<Loader />) :
        <div className="dashboard scrollable">
            <Row>
                <Col md={4} className='p-5'>
                    <div className='dashboard-card'>
                        <h3>Total Bookings</h3>
                        <p>
                            5
                        </p>
                    </div>
                </Col>
                <Col md={4} className='p-5' >
                    <div className='dashboard-card'>
                        <h3>Total Trains</h3>
                        <p>
                            {trainCount}
                        </p>
                    </div>
                </Col>
                <Col md={4} className='p-5' >
                    <div className='dashboard-card'>
                        <h3>Total Passengers</h3>
                        <p>
                            5
                        </p>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2 className='mb-5 text-center'>Summary Chart</h2>
                    <div className='dashboard-chart-container'>
                        <LineChart
                            width={1000}
                            height={500}
                            data={trainsData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="bookings"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                            <Line type="monotone" dataKey="income" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;