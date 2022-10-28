import React, {useState, useEffect} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {addDoc, collection, doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import {Row, Col, Button} from 'react-bootstrap';
import './addTrain.css';

export default function AddTrainForm() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const edit = searchParams.get('edit');
    const id = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [sTime, setSTime] = useState('');
    const [eTime, setETime] = useState('');
    const [seatsFirstClass, setSeatsFirstClass] = useState(0);
    const [ticketPriceFirstClass, setTicketPriceFirstClass] = useState(0.00);
    const [seatsSecondClass, setSeatsSecondClass] = useState(0);
    const [ticketPriceSecondClass, setTicketPriceSecondClass] = useState(0.00);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(edit && !id.trim()) {
            navigate('/trains');
        }

        if(edit === 'true') {
            setLoading(true);
            // fetch current train data
            getDoc(doc(db, 'trains', id))
                .then(d => {
                    const data = {id: d.id, ...d.data()};
                    setTitle(data.title)
                    setStart(data.startPoint);
                    setEnd(data.endPoint);
                    setSTime(data.startTime.split(' ')[0]);
                    setETime(data.endTime.split(' ')[0]);
                    setSeatsFirstClass(data.firstClass.seats)
                    setTicketPriceFirstClass(data.firstClass.price);
                    setTicketPriceSecondClass(data.secondClass.price);
                    setSeatsSecondClass(data.secondClass.seats)
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                    toast.error('Cannot update, try again');
                    navigate('trains');
                })
        }


    }, [edit, id, navigate])

    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true);

        const newTrain = {
            title: title.trim(),
            startPoint: start.trim(),
            endPoint: end.trim(),
            startTime: sTime.trim(),
            endTime: eTime.trim(),
            firstClass: {
                price: +ticketPriceFirstClass,
                seats: seatsFirstClass
            },
            secondClass: {
                price: +ticketPriceSecondClass,
                seats: seatsSecondClass
            },
            bookedSeatsFirstClass: 0,
            bookedSeatsSecondClass: 0,
            totalIncome: 0,
            totalBookings: 0
        }

        const {title:trainTitle, startPoint, endPoint, startTime, endTime, firstClass, secondClass} = newTrain;

        if(!trainTitle || 
            !startPoint || 
            !endPoint || 
            !startTime || 
            !endTime || 
            !firstClass.price || !firstClass.seats ||
            !secondClass.price || !secondClass.seats) {
            setLoading(false);
            toast.error('Invalid values for fields. make sure all values are valid');
            return;
        }

        newTrain.startTime = sTime.split(':')[0] >= 12 ? `${sTime.trim()} PM` : `${sTime} AM`;
        newTrain.endTime = eTime.split(':')[0] >= 12 ? `${eTime.trim()} PM` : `${eTime} AM`;

        if(edit === 'true' && id.trim() !== '') {
            // update the existing train
            updateDoc(doc(db, 'trains', id), newTrain)
                .then(() => {
                    setLoading(false);
                    toast.success('Train Updated');
                    navigate('/trains');
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                    toast.error('Train update failed, try again');
                })
        }
        
        if(!edit) {
            // create a collection reference
            const colRef = collection(db, 'trains');
            addDoc(colRef, newTrain)
                .then(res => {
                    setTitle('');
                    setStart('');
                    setEnd('');
                    setSTime('');
                    setETime('');
                    setSeatsFirstClass(0);
                    setSeatsSecondClass(0);
                    setTicketPriceFirstClass(0.00);
                    setTicketPriceSecondClass(0.00);
                    toast.success('New Train Added Successfully')
                    setLoading(false);

                    // update the train count in counts collection
                    getDoc(doc(db, 'counts', 'total-train-count'))
                        .then(snapshot => {
                            const currentCount = snapshot.data().count;
                            return setDoc(doc(db, 'counts', 'total-train-count'), {count: currentCount + 1});
                        })
                        .then(() => {
                            
                        })
                        .catch(err => {
                            console.log(err.message)
                        })


                })
                .catch(err => {
                    setLoading(false);
                    console.log(err.message)
                })
        }
        
    }


  return (
    <div className='add-new-train-wrapper scrollable' style={{overflowX: 'hidden'}}>
        <Row>
            <Col>
                <Button variant='primary' onClick={() => navigate('/trains')}>Go Back</Button>
            </Col>
        </Row>
    <div className='add-new-train-card'>
        <div className="form-topic">
            <p>{edit ? 'Update Train' : 'Ad New Train'}</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-content">

                <div className="train-title-row">
                        <div className="train-title">
                            <label>Train Title</label>
                            <input type='text' placeholder='Enter Train Title' onChange={e => setTitle(e.target.value)} value={title} />
                        </div>
                </div>

                <div className="start-end-points">
                    <div className="train-start-point">
                        <label>Start Point</label>
                        <input type='text' placeholder='Enter Start Point' onChange={e => setStart(e.target.value)} value={start} />
                    </div>

                    <div className="tarin-end-point">
                        <label>End Point</label>
                        <input type='text' placeholder='Enter End Point' onChange={e => setEnd(e.target.value)} value={end} />
                    </div>
                </div>

                <div className="start-end-time">
                    <div className="train-start-time">
                        <label>Start time</label>
                        <input type='time' onChange={e => setSTime(e.target.value)} value={sTime} />
                    </div>

                    <div className="train-stop-time">
                        <label>Stop time</label>
                        <input type='time' onChange={e => setETime(e.target.value)} value={eTime} />
                    </div>
                </div>

                <h5>First Class</h5>
                <div className="start-end-time">
                    
                    <div className="train-start-time">
                        <label>Total available seats</label>
                        <input type='number' onChange={e => setSeatsFirstClass(e.target.value)} value={seatsFirstClass}/>
                    </div>

                    <div className="train-stop-time">
                        <label>Ticket price per seat</label>
                        <input type='number' step='.01' onChange={e => setTicketPriceFirstClass(e.target.value)} value={ticketPriceFirstClass} />
                    </div>
                </div>

                <h5>Economy Class</h5>
                <div className="start-end-time">
                    
                    <div className="train-start-time">
                        <label>Total available seats</label>
                        <input type='number' onChange={e => setSeatsSecondClass(e.target.value)} value={seatsSecondClass}/>
                    </div>

                    <div className="train-stop-time">
                        <label>Ticket price per seat</label>
                        <input type='number' step='.01' onChange={e => setTicketPriceSecondClass(e.target.value)} value={ticketPriceSecondClass} />
                    </div>
                </div>

                <div className="button-row">
                    <button type='submit'>{loading ? <i id='spinner-icon' className="fa fa-spinner" aria-hidden="true"></i> : edit ? 'Update Train' : 'Add New Train'}</button>
                </div>

            </div>
        </form>
    </div>
    </div>
  )
}
