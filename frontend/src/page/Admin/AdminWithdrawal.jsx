import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdrawalRequest, proceedWithdrawal } from "@/page/State/Withdrawal/Action.js";
import { logout } from "@/page/State/Auth/Action"; // Import logout action
import { useNavigate } from "react-router-dom";

const AdminWithdrawal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requests = [] } = useSelector(store => store.withdrawal);

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = () => {
        dispatch(getAllWithdrawalRequest({ jwt: localStorage.getItem("jwt") }));
    };

    const handleProceedWithdrawal = (id, accept) => {
        dispatch(proceedWithdrawal({ id, jwt: localStorage.getItem("jwt"), accept }))
            .then(() => {
                fetchWithdrawals();
            });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleBackToDashboard = () => {
        navigate("/admin/dashboard");
    };

    const pendingWithdrawals = requests.filter(w => w.status === "PENDING");

    return (
        <div className="min-h-screen py-10 px-4 bg-[#0F172A] text-[#F1F5F9] relative">
            {/* Top Right Buttons */}
            <div className="absolute top-6 right-6 flex gap-2">
                <Button
                    onClick={handleBackToDashboard}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                >
                    Dashboard
                </Button>
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
                >
                    Logout
                </Button>
            </div>

            {/* Content */}
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6 text-center">Withdrawal Requests</h1>

                {pendingWithdrawals.length === 0 ? (
                    <div className="text-center">No withdrawal requests found.</div>
                ) : (
                    <div className="space-y-4">
                        {pendingWithdrawals.map((item) => (
                            <Card key={item.id} className="rounded-xl border border-[#1E293B] bg-[#1E293B] p-6 shadow-md">
                                <div className="flex justify-between text-[#F1F5F9]">
                                    <div>
                                        <p className="text-base font-semibold">{item.user.fullName}</p>
                                        <p className="text-sm">Amount: ₹ {item.amount}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleProceedWithdrawal(item.id, true)}
                                            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4"
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => handleProceedWithdrawal(item.id, false)}
                                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminWithdrawal;
