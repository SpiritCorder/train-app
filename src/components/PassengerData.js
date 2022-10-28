import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import Loader from '../utils/Loader';
import {ListGroup, Row, Col, Form, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

const PassengerData = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const docRef = doc(db, 'customers', id);

        const unsub = onSnapshot(docRef, doc => {
            const c = {id: doc.id, ...doc.data()};
            setCustomer(c);
            setFirstName(c.firstName)
            setLastName(c.lastName)
            setEmail(c.email)
            setPhone(c.phone)
            setLoading(false);
        })

        return () => unsub();

    }, [id]);

    const handleUpdate = e => {
        e.preventDefault();
        
        if(!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
            toast.error('All fields are required');
            return;
        }

        setBtnLoading(true);

        // update the existing document
        updateDoc(doc(db, 'customers', id), {
            firstName,
            lastName,
            email,
            phone
        })
        .then(res => {
            toast.success('Update Success');
            setBtnLoading(false);
        })
        .catch(err => {
            console.log(err);
            setBtnLoading(false);
            toast.error('Can not update, please try again');
        })
    }

    return (
        loading 
            ? (<Loader />)
            : (
                <div className="scrollable">
                    <h1>Passenger Data</h1>
                    <hr></hr>
                    <Row className='mb-4'>
                        <Col>
                            <Button onClick={() => navigate(-1)}>Go Back</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Customer ID</Col>
                                        <Col>{customer?.id}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>First Name</Col>
                                        <Col>{customer?.firstName}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Lase Name</Col>
                                        <Col>{customer?.lastName}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Mobile No.</Col>
                                        <Col>{customer?.phone}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Email</Col>
                                            <Col>{customer?.email}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={7}>
                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Phone No.</Form.Label>
                                    <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                                </Form.Group>
                                
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={btnLoading}
                                
                                >
                                    {btnLoading ? 'Updating...' : 'Update'}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
    );
}

export default PassengerData;