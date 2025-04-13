import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import {
    CopyIcon,
    HistoryIcon,
    RotateCw,
    ShuffleIcon,
    UploadIcon,
    WalletIcon
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import TopupForm from "@/page/Wallet/TopupForm.jsx";
import WithdrawalForm from "@/page/Withdrawal/WithdrawalForm.jsx";
import TransferForm from "@/page/Wallet/TransferForm.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";

const Wallet = () => {
    return (
        <div className="min-h-screen py-10 px-4 flex justify-center bg-[#0F172A] text-[#F1F5F9]">
            <div className="w-full max-w-4xl">
                <Card className="rounded-2xl shadow-md border border-[#1E293B] bg-[#1E293B] text-[#F1F5F9]">
                    <CardHeader className="pb-6 border-b border-[#334155]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <WalletIcon size={32} className="text-[#F1F5F9]" />
                                <div>
                                    <CardTitle className="text-2xl font-semibold">My Wallet</CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <span>#A234F</span>
                                        <CopyIcon size={14} className="cursor-pointer hover:text-slate-300" />
                                    </div>
                                </div>
                            </div>
                            <RotateCw className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer" />
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-white">₹20,000</div>
                        <div className="flex gap-5 mt-8 flex-wrap">
                            {[
                                {
                                    icon: <UploadIcon size={24} className="text-white" />,
                                    label: "Add Money",
                                    form: <TopupForm />
                                },
                                {
                                    icon: <UploadIcon size={24} className="text-white" />,
                                    label: "Withdraw",
                                    form: <WithdrawalForm />
                                },
                                {
                                    icon: <ShuffleIcon size={24} className="text-white" />,
                                    label: "Transfer",
                                    form: <TransferForm />
                                }
                            ].map(({ icon, label, form }, idx) => (
                                <Dialog key={idx}>
                                    <DialogTrigger asChild>
                                        <div className="w-28 h-28 flex flex-col justify-center items-center rounded-xl border border-[#334155] bg-[#0F172A] hover:bg-[#1E293B] hover:scale-105 transition-transform cursor-pointer shadow-sm">
                                            {icon}
                                            <span className="text-sm mt-2 text-slate-200">{label}</span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-[#1E293B] border-none text-[#F1F5F9]">
                                        <DialogHeader>
                                            {form}
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="py-5 pt-10">
                    <div className="flex gap-2 items-center pb-5">
                        <h1 className="text-2xl font-semibold">History</h1>
                        <HistoryIcon className="h-7 w-7 p-0 cursor-pointer hover:text-white text-slate-400" />
                    </div>
                    <div className="space-y-5">
                        {[1, 1, 1, 1].map((item, i) => (
                            <Card key={i} className="px-5 py-4 bg-[#1E293B] border border-[#334155] text-[#F1F5F9]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <Avatar className="bg-[#334155]">
                                            <AvatarFallback>
                                                <ShuffleIcon className="text-white" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 text-left">
                                            <h1 className="font-bold text-lg">Buy Asset</h1>
                                            <p className="text-sm text-slate-400">10/04/2015</p>
                                        </div>
                                    </div>
                                    <p className="text-green-400 font-semibold">₹999</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
