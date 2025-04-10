import React from 'react';
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";

const TransferForm = () => {

    const [formData, setFormData] = React.useState({
        amount: '',
        walletId: '',
        purpose: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = () => {
        console.log(formData)
    };
    return (
        <div className="text-gray-800 p-6 space-y-6">
            <div className="text-center text-lg font-semibold">
                Wallet Transfer
            </div>

            <div className="text-center space-y-2">
                <Label className="text-gray-700">Enter transfer amount</Label>
                <Input
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="₹100"
                    className="appearance-none text-center text-2xl bg-transparent border-none focus:ring-0 text-gray-900"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-gray-700">Wallet ID</Label>
                <Input
                    name="walletId"
                    value={formData.walletId}
                    onChange={handleChange}
                    placeholder="e.g., WAL123456789"
                    className="bg-gray-100 text-gray-900"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-gray-700">Purpose</Label>
                <Input
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="e.g., Payment for services"
                    className="bg-gray-100 text-gray-900"
                />
            </div>
            <DialogClose className="w-full">
                <Button onClick= {handleSubmit} className="w-full mt-4 text-md font-semibold py-6 rounded-lg bg-gray-800 text-white hover:bg-gray-500">
                    Send
                </Button>
            </DialogClose>

        </div>
    );
};

export default TransferForm;
