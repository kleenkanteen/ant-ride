import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../app/page'
import About from '../app/about/page'

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
)

export default AppRoutes

