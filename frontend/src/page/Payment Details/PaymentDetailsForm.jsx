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
        accountNo: '',
        bankName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
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
            {[
                { id: "accountHolderName", label: "Account Holder Name", icon: <User />, placeholder: "e.g., Chahat Sharma" },
                { id: "bankName", label: "Bank Name", icon: <Landmark />, placeholder: "e.g., YES Bank" },
                { id: "accountNo", label: "Account Number", icon: <Hash />, placeholder: "Enter your account number" },
                { id: "ifscCode", label: "IFSC Code", icon: <Shield />, placeholder: "e.g., YESB0000007" }
            ].map(({ id, label, icon, placeholder }) => (
                <motion.div key={id} variants={itemVariants}>
                    <Label htmlFor={id}>{label}</Label>
                    <div className="relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                            <div className="text-muted-foreground">{icon}</div>
                        </div>
                        <Input
                            id={id}
                            name={id}
                            value={formData[id]}
                            onChange={handleChange}
                            className="h-12 pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                            placeholder={placeholder}
                            required
                        />
                    </div>
                </motion.div>
            ))}

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

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