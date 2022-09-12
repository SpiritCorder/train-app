import {Routes, Route} from 'react-router-dom';

import {ToastContainer} from 'react-toastify';

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from './pages/Dahsbord';
import AddNewTrain from './pages/AddNewTrain';
import ProtectedRoute from './utils/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {


  return (
    <>
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/add-train' element={<ProtectedRoute  children={<AddNewTrain />} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<ProtectedRoute children={<DashboardPage />} />} />
      </Routes>
    </>
  );
}

export default App;