import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Index'
import Login from './Session/Login'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Index /> } />
            <Route path="/web/login" element={ <Login /> } />
        </Routes>
    </BrowserRouter>
)

export default App