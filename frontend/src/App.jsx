import { useState } from 'react'
import './App.css';
import Navbar from "@/page/Navbar/Navbar.jsx";
import Home from "@/page/Home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Activity from "@/page/Activity/Activity.jsx";
import Portfolio from "@/page/Portfolio/Portfolio.jsx";
import Wallet from "@/page/Wallet/Wallet.jsx";
import Withdrawal from "@/page/Withdrawal/Withdrawal.jsx";
import PaymentDetails from "@/page/Payment Details/PaymentDetails.jsx";
import StockDetails from "@/page/Stock Details/StockDetails.jsx";
import Watchlist from "@/page/Watchlist/Watchlist.jsx";
import Profile from "@/page/Profile/Profile.jsx";
import SearchCoin from "@/page/Search/SearchCoin.jsx";
import NotFound from "@/page/NotFound/NotFound.jsx";;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/portfolio" element={<Portfolio/>} />
            <Route path="/activity" element={<Activity/>} />
            <Route path="/wallet" element={<Wallet/>} />
            <Route path="/withdrawal" element={<Withdrawal/>} />
            <Route path="/payment-details" element={<PaymentDetails/>} />
            <Route path="/market/:id" element={<StockDetails/>} />
            <Route path="/watchlist" element={<Watchlist/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/search" element={<SearchCoin/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </>
  )
}

export default App
