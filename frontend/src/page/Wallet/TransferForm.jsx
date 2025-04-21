import React from 'react';
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { DialogClose } from "@/components/ui/dialog.jsx";
import {useDispatch} from "react-redux";
import {transferMoney} from "@/page/State/Wallet/Action.js";

const TransferForm = () => {

    const dispatch=useDispatch();
    const [formData, setFormData] = React.useState({
        amount: '',
        walletId: '',
        purpose: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { walletId, amount, purpose } = formData;
        dispatch(transferMoney({
            jwt: localStorage.getItem('jwt'),
            walletId,
            reqData: {amount, purpose}
        }));
    };


    return (
        <div className="text-[#F1F5F9] bg-[#1E293B] p-6 space-y-6 rounded-lg">
            <div className="text-center space-y-2">
                <Label className="text-slate-300">Enter transfer amount</Label>
                <Input
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="₹100"
                    className="appearance-none text-center text-2xl bg-[#0F172A] border border-[#334155] focus:ring-0 text-[#F1F5F9] placeholder:text-slate-400"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Wallet ID</Label>
                <Input
                    name="walletId"
                    value={formData.walletId}
                    onChange={handleChange}
                    placeholder="e.g., WAL123456789"
                    className="bg-[#0F172A] border border-[#334155] text-[#F1F5F9] placeholder:text-slate-400"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-300">Purpose</Label>
                <Input
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="e.g., Payment for services"
                    className="bg-[#0F172A] border border-[#334155] text-[#F1F5F9] placeholder:text-slate-400"
                />
            </div>

            <DialogClose className="w-full">
                <Button
                    onClick={handleSubmit}
                    className="w-full mt-4 text-md font-semibold py-6 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                    Send
                </Button>
            </DialogClose>
        </div>
    );
};

export default TransferForm;
