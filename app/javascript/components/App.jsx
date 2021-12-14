import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Index'
import Login from './Session/Login'
import Dashboard from './Key/Dashboard'
import Signup from './Users/Signup'
const App = () => {
    
    return(
    <BrowserRouter history={history}>
        <Routes>
            <Route path="/" element={ <Index /> } />
            <Route path="/web/login" element={ <Login /> } />
            <Route path="/web/signup" element={ <Signup /> } />
            <Route path="/web/dashboard" element={ <Dashboard /> } />
        </Routes>
    </BrowserRouter>
)}

export default App