import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {DialogClose} from "@/components/ui/dialog.jsx";

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
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <Label className="text-slate-700">Account holder name</Label>
                <Input
                    name="accountHolder"
                    placeholder="e.g. Chahat Sharma"
                    value={form.accountHolder}
                    onChange={handleChange}
                    className="mt-1"
                />
            </div>

            <div>
                <Label className="text-slate-700">IFSC Code</Label>
                <Input
                    name="ifsc"
                    placeholder="e.g. YESB0000007"
                    value={form.ifsc}
                    onChange={handleChange}
                    className="mt-1"
                />
            </div>

            <div>
                <Label className="text-slate-700">Account Number</Label>
                <Input
                    name="accountNumber"
                    type="password"
                    placeholder="Enter your account number"
                    value={form.accountNumber}
                    onChange={handleChange}
                    className="mt-1"
                />
            </div>

            <div>
                <Label className="text-slate-700">Confirm Account Number</Label>
                <Input
                    name="confirmAccountNumber"
                    type="password"
                    placeholder="Confirm your account number"
                    value={form.confirmAccountNumber}
                    onChange={handleChange}
                    className="mt-1"
                />
            </div>

            <div>
                <Label className="text-slate-700">Bank Name</Label>
                <Input
                    name="bankName"
                    placeholder="e.g. YES Bank"
                    value={form.bankName}
                    onChange={handleChange}
                    className="mt-1"
                />
            </div>
            <DialogClose className="w-full">
                <Button type="submit" className="w-full bg-slate-800 text-white hover:bg-slate-700 rounded-xl py-2 text-sm font-medium">
                    Submit
                </Button>
            </DialogClose>

        </form>
    );
};

export default PaymentDetailsForm;
