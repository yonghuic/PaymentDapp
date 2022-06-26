import './App.css';
import 'bulma/css/bulma.min.css'

//做分頁的套件
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

//加icon
import {FcHome} from 'react-icons/fc'
import {FaEthereum} from 'react-icons/fa'

import Home from './components/Home';
import Payment from './components/Payment'

function App() {
  return (
    
    <BrowserRouter >
        <p id="header">Payment<span id="dapp"> Dapp</span></p>
        
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" class="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" href={Link} to="/" >
                <FcHome/>首頁
              </Link>

              <Link className="navbar-item" href={Link} to="/payment" >
                <FaEthereum color="#585858"/>支付
              </Link>
            </div>
          </div>
        </nav>

        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        </div>

        <div id="footer">
          <div class="container">
              <p class="footer-text">Copyright © 2022 Wendy Chen.</p>
          </div>
        </div>
  </BrowserRouter>
  );
}

export default App;
