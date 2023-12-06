import { useState } from 'react'
import './App.css'
import LandingPage from './components/landingPage/LandingPage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import DetailPage from './components/DetailPage/DetailPage'
import Header from './components/landingPage/Header'
function App() {
  const [] = useState(0)

  return (
    <div className='App_Main'>
      <HashRouter>
        <Header/>
         <Routes>
            <Route path='/' element={ <LandingPage/>}/>
            <Route path='detail/:id' element={<DetailPage/>}/>
         </Routes>
      </HashRouter>
    </div>
  )
}

export default App
