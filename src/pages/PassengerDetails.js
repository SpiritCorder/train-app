
import BaseLayout from '../utils/BaseLayout';
import PassengerList from '../components/PassengerList';

const PassengerDetailsPage = () => {


    return  <BaseLayout children={<PassengerList />} active="passenger" />
}

export default PassengerDetailsPage;