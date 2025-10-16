import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleViewWithdrawals = () => navigate("/admin/withdrawals");
    const handleViewUsers = () => navigate("/admin/users");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-background text-foreground">
            <div className="bg-card text-card-foreground rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6 text-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-sm mb-4">Manage Withdrawals and Users</p>

                <div className="flex flex-col space-y-4">
                    <Button
                        onClick={handleViewWithdrawals}
                        className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                        View Withdrawals
                    </Button>

                    <Button
                        onClick={handleViewUsers}
                        className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                        View Users
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;