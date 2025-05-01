import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeStore from './Pages/HomeStore'
import ProductStore from './Pages/ProductStore'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeStore />} />
        <Route path="/product" element={<ProductStore />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App