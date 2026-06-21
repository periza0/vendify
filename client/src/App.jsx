import './App.css'
import './index.css'
import Loginpage from './components/Loginpage'
import { BrowserRouter, Route, Routes, Outlet, Link } from 'react-router-dom'
import OtpInput from './components/OtpInput'
import OtpBack from './components/OtpBack'
import SellForm from './components/SellForm'
import MainPage from './components/MainPage'
import Listing from './components/Listing'
import Incoming from './components/Incoming'
import Outgoing from './components/Outgoing'
import Transactions from './components/Transactions'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Loginpage signup={true}/>}> </Route>
        <Route path='/signin' element={<Loginpage signup={false}/>}> </Route>
        <Route path='/otpValidation' element={<OtpBack> <OtpInput size={4}/> </OtpBack>}></Route>
        <Route path='/seller' element={<SellForm />}></Route>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/listing' element={<Listing edit={true} />}> </Route>
        <Route path="/incoming" element={<Incoming />}></Route>
        <Route path='/Sending' element={<Outgoing />}></Route>
        <Route path='/transactions' element={<Transactions />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
