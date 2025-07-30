import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog.jsx";
import { getPaymentDetails, withdrawRequest } from "@/page/State/Withdrawal/Action.js";
import { Landmark, AlertCircle, Loader2 } from "lucide-react";

const WithdrawalForm = () => {
    const dispatch = useDispatch();
    const { userWallet } = useSelector(store => store.wallet);
    const { paymentDetails } = useSelector(store => store.withdrawal);
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!paymentDetails) {
            setShowDialog(true);
            return;
        }

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        if (numericAmount > userWallet?.balance) {
            setError("Withdrawal amount cannot exceed available balance.");
            return;
        }

        setError('');
        setIsLoading(true);
        dispatch(withdrawRequest({ amount, jwt: localStorage.getItem("jwt") }));
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <motion.div variants={itemVariants}>
                <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-xl font-bold">₹ {userWallet?.balance?.toLocaleString() || '0.00'}</p>
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label htmlFor="amount" className="text-sm font-medium text-muted-foreground">Enter Amount</Label>
                <div className="relative mt-2">
                    <p className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-lg">₹</p>
                    <Input
                        id="amount"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            if (error) setError('');
                        }}
                        className="h-14 pl-8 text-2xl font-bold bg-background border-border"
                        placeholder="0.00"
                        required
                    />
                </div>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label className="text-sm font-medium text-muted-foreground">Transfer to</Label>
                <div className="flex items-center gap-4 rounded-lg border border-border p-4 mt-2">
                    <Landmark className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{paymentDetails?.bankName || "No Bank Linked"}</p>
                        <p className="text-sm text-muted-foreground">
                            {paymentDetails?.accountNo ? `A/C: **** **** ${paymentDetails.accountNo.slice(-4)}` : "Please link a bank account."}
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
                <Button type="submit" size="lg" className="w-full font-semibold" disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        "Withdraw Funds"
                    )}
                </Button>
            </motion.div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="bg-card border-border">
                    <DialogHeader>
                        <div className="flex flex-col items-center text-center gap-4 py-4">
                            <AlertCircle className="w-16 h-16 text-yellow-500" />
                            <DialogTitle className="text-2xl">Payment Details Missing</DialogTitle>
                            <DialogDescription>
                                Please add your bank account details in your profile before you can withdraw funds.
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setShowDialog(false)} className="w-full">Okay</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    );
};

export default WithdrawalForm;