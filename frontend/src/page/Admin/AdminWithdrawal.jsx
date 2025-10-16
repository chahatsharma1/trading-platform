import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdrawalRequest, proceedWithdrawal } from "@/page/State/Withdrawal/Action.js";
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
            .then(() => fetchWithdrawals());
    };

    const handleBackToDashboard = () => navigate("/admin/dashboard");

    const pendingWithdrawals = requests.filter(w => w.status === "PENDING");

    return (
        <div className="min-h-screen py-10 px-4 bg-background text-foreground relative">
            <div className="absolute top-6 right-6 flex gap-2">
                <Button
                    onClick={handleBackToDashboard}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground text-xs px-3 py-1 rounded-md">
                    Dashboard
                </Button>
            </div>

            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6 text-center">Withdrawal Requests</h1>

                {pendingWithdrawals.length === 0 ? (
                    <div className="text-center text-muted-foreground">No withdrawal requests found.</div>
                ) : (
                    <div className="space-y-4">
                        {pendingWithdrawals.map((item) => (
                            <Card key={item.id} className="rounded-xl border border-border bg-card p-6 shadow-md">
                                <div className="flex justify-between text-card-foreground">
                                    <div>
                                        <p className="text-base font-semibold">{item.user.fullName}</p>
                                        <p className="text-sm">Amount: ₹ {item.amount}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleProceedWithdrawal(item.id, true)}
                                            className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl px-4">
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => handleProceedWithdrawal(item.id, false)}
                                            className="bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-xl px-4">
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