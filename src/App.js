import './App.css';
import React from 'react';
import Private from './private';
import Login from './login';
import Home from './home';
import Signup from './signup';
import Account from './accounts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Deposit from './deposit';
import Investment from './investment';
import Transfer from './transfer';
function App() {

  return (
    <Router >
    <div>
      

        
<Routes>

              <Route element={<Private />}>
              
              <Route path="/" element={<Home />}></Route>
              <Route path="/accounts" element={<Account/>}></Route>
              <Route path="/deposit" element={<Deposit/>}></Route>
              <Route path="/investment" element={<Investment/>}></Route>
              <Route path="/transfer" element={<Transfer/>}></Route>
              </Route>
              
            <Route path="/login" element={<Login/>}></Route>
        
            <Route path="/signup" element={<Signup />}></Route>
            </Routes>
      
    </div>

    </Router>
  );
}

export default App;
