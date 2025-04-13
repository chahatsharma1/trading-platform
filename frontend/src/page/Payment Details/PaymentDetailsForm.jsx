import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog.jsx";

const PaymentDetailsForm = () => {
    const [form, setForm] = useState({
        accountHolder: '',
        ifsc: '',
        accountNumber: '',
        confirmAccountNumber: '',
        bankName: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted", form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-[#F1F5F9]">
            <div>
                <Label className="text-[#F1F5F9]">Account holder name</Label>
                <Input
                    name="accountHolder"
                    placeholder="e.g. Chahat Sharma"
                    value={form.accountHolder}
                    onChange={handleChange}
                    className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder-[#94A3B8]"
                />
            </div>

            <div>
                <Label className="text-[#F1F5F9]">IFSC Code</Label>
                <Input
                    name="ifsc"
                    placeholder="e.g. YESB0000007"
                    value={form.ifsc}
                    onChange={handleChange}
                    className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder-[#94A3B8]"
                />
            </div>

            <div>
                <Label className="text-[#F1F5F9]">Account Number</Label>
                <Input
                    name="accountNumber"
                    type="password"
                    placeholder="Enter your account number"
                    value={form.accountNumber}
                    onChange={handleChange}
                    className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder-[#94A3B8]"
                />
            </div>

            <div>
                <Label className="text-[#F1F5F9]">Confirm Account Number</Label>
                <Input
                    name="confirmAccountNumber"
                    type="password"
                    placeholder="Confirm your account number"
                    value={form.confirmAccountNumber}
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

            <DialogClose className="w-full">
                <Button
                    type="submit"
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl py-2 text-sm font-medium"
                >
                    Submit
                </Button>
            </DialogClose>
        </form>
    );
};

export default PaymentDetailsForm;
