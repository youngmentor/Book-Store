import { useState } from 'react'
import './App.css'
import LandingPage from './components/landingPage/LandingPage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import DetailPage from './components/DetailPage/DetailPage'
import Header from './components/landingPage/Header'
import AdminSignup from './components/onboarding/signup/AdminSignup'
import LoginPage from './components/onboarding/login/Login'
import UserSignup from './components/onboarding/signup/UserSignup'
import CheckOut from './components/cartPage/CheckOut'
function App() {
  const [] = useState(0)

  return (
    <div className='App_Main'>
      <HashRouter>
        <Header/>
         <Routes>
            <Route path='/' element={ <LandingPage/>}/>
            <Route path='detail/:id' element={<DetailPage/>}/>
            <Route path='/admin-signup' element={<AdminSignup/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/user-signup' element={<UserSignup/>}/>
            <Route path='/checkout' element={<CheckOut/>}/>
         </Routes>
      </HashRouter>
    </div>
  )
}

export default App
