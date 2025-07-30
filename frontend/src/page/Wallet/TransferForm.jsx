import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { DialogClose } from "@/components/ui/dialog.jsx";
import { transferMoney } from "@/page/State/Wallet/Action.js";
import { Wallet, MessageSquare, Loader2 } from 'lucide-react';

const TransferForm = () => {
    const dispatch = useDispatch();
    const { userWallet } = useSelector(store => store.wallet);
    const [formData, setFormData] = useState({
        amount: '',
        walletId: '',
        purpose: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { walletId, amount, purpose } = formData;
        const numericAmount = parseFloat(amount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        if (numericAmount > userWallet?.balance) {
            setError("Transfer amount cannot exceed available balance.");
            return;
        }
        if (!walletId.trim()) {
            setError("Recipient Wallet ID is required.");
            return;
        }

        setError('');
        setIsLoading(true);
        dispatch(transferMoney({
            jwt: localStorage.getItem('jwt'),
            walletId,
            reqData: { amount, purpose }
        }));
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
                <Label htmlFor="amount" className="text-sm font-medium text-muted-foreground">Amount</Label>
                <div className="relative mt-2">
                    <p className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-lg">₹</p>
                    <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        className="h-12 pl-8 text-lg font-bold bg-background border-border"
                        placeholder="0.00"
                        required
                    />
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label htmlFor="walletId" className="text-sm font-medium text-muted-foreground">Recipient Wallet ID</Label>
                <div className="relative mt-2">
                    <Wallet className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="walletId"
                        name="walletId"
                        value={formData.walletId}
                        onChange={handleChange}
                        className="h-12 pl-12 bg-background border-border"
                        placeholder="Enter recipient's wallet ID"
                        required
                    />
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label htmlFor="purpose" className="text-sm font-medium text-muted-foreground">Purpose (Optional)</Label>
                <div className="relative mt-2">
                    <MessageSquare className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="h-12 pl-12 bg-background border-border"
                        placeholder="e.g., Payment for services"
                    />
                </div>
            </motion.div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <motion.div variants={itemVariants} className="pt-4">
                <DialogClose asChild>
                    <Button type="submit" size="lg" className="w-full font-semibold" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Sending...</span>
                            </div>
                        ) : (
                            "Send Money"
                        )}
                    </Button>
                </DialogClose>
            </motion.div>
        </form>
    );
};

export default TransferForm;