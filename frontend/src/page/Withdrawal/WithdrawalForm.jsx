import React from 'react';
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Landmark} from "lucide-react";
import {DialogClose} from "@/components/ui/dialog.jsx";

const WithdrawalForm = () => {
    const [amount, setAmount] = React.useState('');

    const handleSubmit = (e) => {
        console.log(amount)
    };

    return (
        <div className=" text-gray-800 p-6 space-y-6">
            <div className="text-center text-lg font-semibold">
                Request Withdrawal
            </div>

            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <span className="text-sm text-gray-600">Available balance</span>
                <span className="text-gray-800 font-bold text-lg">₹5000</span>
            </div>

            <div className="text-center space-y-2">
                <Label className="text-gray-700">Enter withdrawal amount</Label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="₹100"
                    className="text-center text-2xl bg-transparent border-none focus:ring-0 text-gray-900"
                />
            </div>

            <div>
                <Label className="text-sm text-gray-700">Transfer to</Label>
                <div className="bg-gray-100 flex items-center justify-between px-4 py-3 rounded-lg mt-1">
                    <div className="flex items-center space-x-3">
                        <Landmark size={20} />
                        <div>
                            <div className="font-semibold">Yes Bank</div>
                            <div className="text-xs text-gray-500">•••• 1651</div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogClose className="w-full">
                <Button onClick={handleSubmit} className="w-full mt-4 text-md font-semibold py-6 rounded-lg bg-gray-800 text-white hover:bg-gray-500">
                    Withdraw
                </Button>
            </DialogClose>
        </div>
    );
};

export default WithdrawalForm;
