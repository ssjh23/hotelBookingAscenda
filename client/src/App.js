import FrontPage from './components/homepage/FrontPage'; 
import ListingsPage from './components/hotelsearch/hotellistings/ListingsPage';
import DeleteUser from './components/deleteuser/DeleteUser';
import ErrorPage from './components/hotelsearch/ErrorPage';
import PaymentDetailsPage from "./components/payment/pages/PaymentDetails";
import SuccessfulBooking from "./components/payment/pages/SuccessfulBooking";
import { Routes, Route, Link } from 'react-router-dom';
import FetchRoom from './components/hotelsearch/hotelroomdetails/FetchRoom';

function App() {

  return (
    <div className="App">
      <header className='app-header'>
        <Link to='/' id='linkToHome'>
          <h1 id='logo'>ASCENDA BOOKINGS</h1>
        </Link>
      </header> 
      <Routes> 
        <Route path='/' element={<FrontPage />}/>
        <Route path='/hotels' element={<ListingsPage />}/>
        <Route path='/hotels/:id' element={<FetchRoom />}/>
        <Route path="/hotels/:id/payment_details/:key" element={<PaymentDetailsPage/>}></Route>
        <Route path="/hotels/payment_successful" element={<SuccessfulBooking/>}></Route>
        <Route path="/deleteuser" element={<DeleteUser/>}></Route>
        <Route path='/*' element={<ErrorPage />}/>
      </Routes>
   
    </div>
  );
}
export default App;
