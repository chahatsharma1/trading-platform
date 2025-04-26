import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "@/page/Navbar/Navbar.jsx";
import Home from "@/page/Home/Home.jsx";
import Activity from "@/page/Activity/Activity.jsx";
import Portfolio from "@/page/Portfolio/Portfolio.jsx";
import Wallet from "@/page/Wallet/Wallet.jsx";
import Withdrawal from "@/page/Withdrawal/Withdrawal.jsx";
import PaymentDetails from "@/page/Payment Details/PaymentDetails.jsx";
import CoinDetails from "@/page/Coin Details/CoinDetails.jsx";
import Watchlist from "@/page/Watchlist/Watchlist.jsx";
import Profile from "@/page/Profile/Profile.jsx";
import SearchCoin from "@/page/Search/SearchCoin.jsx";
import HomePage from "@/page/Auth/HomePage.jsx";
import Login from "@/page/Auth/Login.jsx";
import Signup from "@/page/Auth/Signup.jsx";
import ForgotPassword from "@/page/Auth/ForgotPassword.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "@/page/State/Auth/Action.js";
import AdminWithdrawal from "@/page/Admin/AdminWithdrawal.jsx";
import PaymentCancel from "@/page/Wallet/PaymentCancel.jsx";
import AdminDashboard from "@/page/Admin/AdminDashboard.jsx";
import UserPage from "@/page/Admin/UserPage.jsx";

function App() {
    const { user, jwt } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = jwt || localStorage.getItem("jwt");
        if (token && !user) {
            dispatch(getUser(token));
        }
    }, [jwt, dispatch, user]);

    const isLoggedIn = Boolean(user);
    const isAdmin = user?.userRole?.includes("ROLE_ADMIN");
    const isCustomer = user?.userRole?.includes("ROLE_CUSTOMER");

    const showNavbar = isLoggedIn;


    return (
        <>
            {showNavbar && <Navbar />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {isLoggedIn && isAdmin && (
                    <>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/withdrawals" element={<AdminWithdrawal />} />
                        <Route path="/admin/users" element={<UserPage />} />
                    </>
                )}

                {isLoggedIn && isCustomer && (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/withdrawal" element={<Withdrawal />} />
                        <Route path="/payment-details" element={<PaymentDetails />} />
                        <Route path="/market/:id" element={<CoinDetails />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/search" element={<SearchCoin />} />
                        <Route path="/cancel" element={<PaymentCancel />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </>
    );
}
export default App
