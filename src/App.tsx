import './scss/app.scss';
import React from 'react';
import Header from './components/Header';
import Main from './Pages/Main';
import NotFound from './Pages/NotFound/index';
import { Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import PizzaInfo from './Pages/PizzaInfo';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/pizza/:id" element={<PizzaInfo />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
