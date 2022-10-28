
import {Routes, Route} from 'react-router-dom';

import {ToastContainer} from 'react-toastify';

import AuthProvider from './context/authContext';

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from './pages/DahsbordPage';
import AddNewTrain from './pages/AddNewTrain';
import TrainDetailsPage from './pages/TrainDetails';
import TrainBookingsPage from './pages/TrainBookings';
import PassengerDetailsPage from './pages/PassengerDetails';
import PassengerViewPage from './pages/PassengerView';
import IncomePage from './pages/Income';

import ProtectedRoute from './utils/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <ToastContainer position='top-center' />
      <AuthProvider>
        <Routes>
          <Route path='/trains' element={<ProtectedRoute  children={<TrainDetailsPage />} />} />
          <Route path='/trains/add-train' element={<ProtectedRoute  children={<AddNewTrain />} />} />
          <Route path='/trains/bookings/:trainId' element={<ProtectedRoute children={<TrainBookingsPage />} />} />
          <Route path='/passengers' element={<ProtectedRoute children={<PassengerDetailsPage />} />} />
          <Route path='/passengers/:id' element={<ProtectedRoute children={<PassengerViewPage />} />} />
          <Route path='/income' element={<ProtectedRoute children={<IncomePage />} />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<ProtectedRoute children={<DashboardPage />} />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;