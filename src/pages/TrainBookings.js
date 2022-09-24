
import BaseLayout from '../utils/BaseLayout';
import TrainBookings from '../components/TrainBookings';

const TrainBookingsPage = () => {


    return <BaseLayout children={<TrainBookings />} active="bookings" />
}

export default TrainBookingsPage;