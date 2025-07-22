import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/page/State/Auth/Action";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleViewWithdrawals = () => {
        navigate("/admin/withdrawals");
    };

    const handleViewUsers = () => {
        navigate("/admin/users");
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 relative">
            <Button
                onClick={handleLogout}
                className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
            >
                Logout
            </Button>

            <div className="bg-[#1E293B] rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6 text-center">
                <h1 className="text-3xl font-bold text-[#F1F5F9]">Admin Dashboard</h1>
                <p className="text-[#F1F5F9] text-sm mb-4">Manage Withdrawals and Users</p>

                <div className="flex flex-col space-y-4">
                    <Button
                        onClick={handleViewWithdrawals}
                        className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    >
                        View Withdrawals
                    </Button>

                    <Button
                        onClick={handleViewUsers}
                        className="w-full bg-[#3B82F6] text-white hover:bg-[#0EA5E9]"
                    >
                        View Users
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
