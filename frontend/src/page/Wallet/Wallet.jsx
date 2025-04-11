import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {CopyIcon, HistoryIcon, RotateCw, ShuffleIcon, UploadIcon, WalletIcon} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog.jsx";
import TopupForm from "@/page/Wallet/TopupForm.jsx";
import WithdrawalForm from "@/page/Withdrawal/WithdrawalForm.jsx";
import TransferForm from "@/page/Wallet/TransferForm.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";

const Wallet = () => {
    return (
        <div className="min-h-screen py-10 px-4 flex justify-center">
            <div className="w-full max-w-4xl">
                <Card className="rounded-2xl shadow-md border border-slate-200">
                    <CardHeader className="pb-6 border-b">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <WalletIcon size={32} className="text-slate-700" />
                                <div>
                                    <CardTitle className="text-2xl font-semibold text-slate-800">My Wallet</CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <span>#A234F</span>
                                        <CopyIcon size={14} className="cursor-pointer hover:text-slate-400" />
                                    </div>
                                </div>
                            </div>
                            <RotateCw className="w-6 h-6 text-slate-600 hover:text-slate-400 cursor-pointer" />
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-slate-800">₹20,000</div>
                        <div className="flex gap-5 mt-8 flex-wrap">
                            {[
                                {
                                    icon: <UploadIcon size={24} />,
                                    label: "Add Money",
                                    form: <TopupForm />
                                },
                                {
                                    icon: <UploadIcon size={24} />,
                                    label: "Withdraw",
                                    form: <WithdrawalForm />
                                },
                                {
                                    icon: <ShuffleIcon size={24} />,
                                    label: "Transfer",
                                    form: <TransferForm />
                                }
                            ].map(({ icon, label, form }, idx) => (
                                <Dialog key={idx}>
                                    <DialogTrigger asChild>
                                        <div className="w-28 h-28 flex flex-col justify-center items-center rounded-xl border bg-white hover:bg-slate-100 hover:scale-105 transition-transform cursor-pointer shadow-sm">
                                            {icon}
                                            <span className="text-sm mt-2 text-slate-700">{label}</span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
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
                        <h1 className="text-2xl font-semibold"> History</h1>
                        <HistoryIcon className="h-7 w-7 p-0 cursor-pointer hover:text-slate-950"/>
                    </div>
                    <div className="space-y-5">
                        {[1, 1, 1, 1] .map((item, i) => <div key={i}>
                            <Card className="px-5 py-4 p-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <Avatar>
                                            <AvatarFallback>
                                                <ShuffleIcon />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 text-left">
                                            <h1 className="font-bold text-lg">Buy Asset</h1>
                                            <p className="text-sm text-slate-700">10/04/2015</p>
                                        </div>
                                    </div>
                                    <p className="text-green-400 font-semibold">₹999</p>
                                </div>
                            </Card>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Wallet;