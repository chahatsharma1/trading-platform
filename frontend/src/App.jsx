import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { getUser } from "@/page/State/Auth/Action.js";
import AdminWithdrawal from "@/page/Admin/AdminWithdrawal.jsx";
import PaymentCancel from "@/page/Wallet/PaymentCancel.jsx";
import AdminDashboard from "@/page/Admin/AdminDashboard.jsx";
import UserPage from "@/page/Admin/UserPage.jsx";
import ProtectedRoute from './ProtectedRoute';
import AccessDenied from "@/page/Auth/AccessDenied.jsx";

function App() {
    const { user, jwt } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = jwt || localStorage.getItem("jwt");
        if (token && !user) {
            dispatch(getUser(token));
        }
    }, [jwt, user, dispatch]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/cancel" element={<PaymentCancel />} />
                <Route path="/access-denied" element={<AccessDenied />} />


                <Route path="/home" element={<ProtectedRoute role="ROLE_CUSTOMER"><Home /></ProtectedRoute>} />
                <Route path="/portfolio" element={<ProtectedRoute role="ROLE_CUSTOMER"><Portfolio /></ProtectedRoute>} />
                <Route path="/activity" element={<ProtectedRoute role="ROLE_CUSTOMER"><Activity /></ProtectedRoute>} />
                <Route path="/wallet" element={<ProtectedRoute role="ROLE_CUSTOMER"><Wallet /></ProtectedRoute>} />
                <Route path="/withdrawal" element={<ProtectedRoute role="ROLE_CUSTOMER"><Withdrawal /></ProtectedRoute>} />
                <Route path="/payment-details" element={<ProtectedRoute role="ROLE_CUSTOMER"><PaymentDetails /></ProtectedRoute>} />
                <Route path="/market/:id" element={<ProtectedRoute role="ROLE_CUSTOMER"><CoinDetails /></ProtectedRoute>} />
                <Route path="/watchlist" element={<ProtectedRoute role="ROLE_CUSTOMER"><Watchlist /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute role="ROLE_CUSTOMER"><Profile /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute role="ROLE_CUSTOMER"><SearchCoin /></ProtectedRoute>} />

                <Route path="/admin/dashboard" element={<ProtectedRoute role="ROLE_ADMIN"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/withdrawals" element={<ProtectedRoute role="ROLE_ADMIN"><AdminWithdrawal /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute role="ROLE_ADMIN"><UserPage /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default App;