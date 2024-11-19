import React from 'react';
import Invoices from './components/Invoices.js';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div className="App">
      <Invoices />
      <ToastContainer />
    </div>
  );
}

export default App;

