import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPaymentDetails } from "@/page/State/Withdrawal/Action.js";
import { User, Shield, Hash, Landmark, Loader2 } from "lucide-react";

const PaymentDetailsForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        accountHolderName: '',
        ifscCode: '',
        accountNumber: '',
        bankName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if(error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (!formData[key].trim()) {
                setError("All fields are required.");
                return;
            }
        }

        setError('');
        setIsLoading(true);
        await dispatch(addPaymentDetails({ paymentDetails: formData, jwt: localStorage.getItem("jwt") }));
        setIsLoading(false);
        if (onSuccess) onSuccess();
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <motion.div variants={itemVariants}>
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <div className="relative mt-2">
                    <User className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="accountHolderName"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                        className="h-12 pl-12 bg-background border-border"
                        placeholder="e.g., Chahat Sharma"
                        required
                    />
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label htmlFor="bankName">Bank Name</Label>
                <div className="relative mt-2">
                    <Landmark className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="h-12 pl-12 bg-background border-border"
                        placeholder="e.g., YES Bank"
                        required
                    />
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label htmlFor="accountNumber">Account Number</Label>
                <div className="relative mt-2">
                    <Hash className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="h-12 pl-12 bg-background border-border"
                        placeholder="Enter your account number"
                        required
                    />
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <div className="relative mt-2">
                    <Shield className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="ifscCode"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="h-12 pl-12 bg-background border-border"
                        placeholder="e.g., YESB0000007"
                        required
                    />
                </div>
            </motion.div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <motion.div variants={itemVariants} className="pt-4">
                <Button type="submit" size="lg" className="w-full font-semibold" disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Saving...</span>
                        </div>
                    ) : (
                        "Save Details"
                    )}
                </Button>
            </motion.div>
        </form>
    );
};

export default PaymentDetailsForm;