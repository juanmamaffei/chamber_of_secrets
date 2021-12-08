import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Index'
import Login from './Session/Login'
import Dashboard from './Key/Dashboard'

const App = () => {
    return(
    <BrowserRouter history={history}>
        <Routes>
            <Route path="/" element={ <Index /> } />
            <Route path="/web/login" element={ <Login /> } />
            <Route path="/web/dashboard" element={ <Dashboard /> } />

        </Routes>
    </BrowserRouter>
)}

export default App