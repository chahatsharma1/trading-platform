import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { addPaymentDetails } from "@/page/State/Withdrawal/Action.js";

const PaymentDetailsForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        accountHolderName: '',
        ifscCode: '',
        accountNo: '',
        bankName: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addPaymentDetails({ paymentDetails: form, jwt: localStorage.getItem("jwt") }));
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-[#F1F5F9]">
            <div>
                <Label className="text-[#F1F5F9]">Account holder name</Label>
                <Input
                    name="accountHolderName"
                    placeholder="e.g. Chahat Sharma"
                    value={form.accountHolderName}
                    onChange={handleChange}
                    className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder-[#94A3B8]"
                />
            </div>
            <div>
                <Label className="text-[#F1F5F9]">IFSC Code</Label>
                <Input
                    name="ifscCode"
                    placeholder="e.g. YESB0000007"
                    value={form.ifscCode}
                    onChange={handleChange}
                    className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder-[#94A3B8]"
                />
            </div>
            <div>
                <Label className="text-[#F1F5F9]">Account Number</Label>
                <Input
                    name="accountNo"
                    placeholder="Enter your account number"
                    value={form.accountNo}
                    onChange={handleChange}
                    className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder-[#94A3B8]"
                />
            </div>
            <div>
                <Label className="text-[#F1F5F9]">Bank Name</Label>
                <Input
                    name="bankName"
                    placeholder="e.g. YES Bank"
                    value={form.bankName}
                    onChange={handleChange}
                    className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder-[#94A3B8]"
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl py-2 text-sm font-medium"
            >
                Submit
            </Button>
        </form>
    );
};

export default PaymentDetailsForm;
