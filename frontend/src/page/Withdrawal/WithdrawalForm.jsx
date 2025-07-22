import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Landmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails, withdrawRequest } from "@/page/State/Withdrawal/Action.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog.jsx";

const WithdrawalForm = () => {
    const dispatch = useDispatch();
    const { userWallet } = useSelector(store => store.wallet);
    const { paymentDetails } = useSelector(store => store.withdrawal);
    const [amount, setAmount] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const handleSubmit = () => {
        if (!paymentDetails) {
            setShowDialog(true);
            return;
        }
        dispatch(withdrawRequest({ amount, jwt: localStorage.getItem("jwt") }));
    };

    useEffect(() => {
        dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    return (
        <div className="text-[#F1F5F9] bg-[#1E293B] p-6 space-y-6 rounded-xl">
            <div className="bg-[#334155] p-4 rounded-lg flex justify-between items-center">
                <span className="text-sm text-slate-300">Available balance</span>
                <span className="text-[#F1F5F9] font-bold text-lg">₹ {userWallet?.balance}</span>
            </div>

            <div className="text-center space-y-2">
                <Label className="text-slate-300">Enter withdrawal amount</Label>
                <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="₹ 100"
                    className="text-center text-2xl bg-[#0F172A] border border-[#334155] text-[#F1F5F9] focus:ring-0"
                />
            </div>

            <div>
                <Label className="text-sm text-slate-300">Transfer to</Label>
                <div className="bg-[#334155] flex items-center justify-between px-4 py-3 rounded-lg mt-1">
                    <div className="flex items-center space-x-3">
                        <Landmark size={20} className="text-slate-300" />
                        <div>
                            <div className="font-semibold text-[#F1F5F9]">
                                {paymentDetails?.bankName || "No Bank Linked"}
                            </div>
                            <div className="text-xs text-slate-400">
                                {paymentDetails?.accountNo ? paymentDetails.accountNo.replace(/\d(?=\d{4})/g, '*') : "N/A"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                className="w-full mt-4 text-md font-semibold py-6 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                Withdraw
            </Button>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="bg-[#1E293B] border-[#334155] text-[#F1F5F9]">
                    <DialogHeader>
                        <DialogTitle>Payment Details Missing</DialogTitle>
                    </DialogHeader>
                    <div className="text-slate-300">
                        Please add your payment details first to withdraw money.
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => setShowDialog(false)}
                            className="mt-4 w-full bg-[#3B82F6] hover:bg-[#2563EB]"
                        >
                            Ok
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default WithdrawalForm;
