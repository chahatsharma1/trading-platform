import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "@/page/Navbar/Navbar.jsx";
import Home from "@/page/Home/Home.jsx";
import Activity from "@/page/Activity/Activity.jsx";
import Portfolio from "@/page/Portfolio/Portfolio.jsx";
import Wallet from "@/page/Wallet/Wallet.jsx";
import Withdrawal from "@/page/Withdrawal/Withdrawal.jsx";
import PaymentDetails from "@/page/Payment Details/PaymentDetails.jsx";
import StockDetails from "@/page/Stock Details/StockDetails.jsx";
import Watchlist from "@/page/Watchlist/Watchlist.jsx";
import Profile from "@/page/Profile/Profile.jsx";
import SearchCoin from "@/page/Search/SearchCoin.jsx";
import NotFound from "@/page/NotFound/NotFound.jsx";
import HomePage from "@/page/Auth/HomePage.jsx";
import Login from "@/page/Auth/Login.jsx";
import Signup from "@/page/Auth/Signup.jsx";
import ForgotPassword from "@/page/Auth/ForgotPassword.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "@/page/State/Auth/Action.js";

function App() {
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();

    const isLoggedIn = Boolean(auth?.user);

    useEffect(() => {
        dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
    }, [auth.jwt, dispatch]);

    return (
        <>
            {isLoggedIn && <Navbar />}

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes */}
                {isLoggedIn && (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/withdrawal" element={<Withdrawal />} />
                        <Route path="/payment-details" element={<PaymentDetails />} />
                        <Route path="/market/:id" element={<StockDetails />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/search" element={<SearchCoin />} />
                    </>
                )}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
