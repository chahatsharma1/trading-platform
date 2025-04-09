import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {CopyIcon, DollarSign, RefreshCw, ShuffleIcon, UploadIcon, WalletIcon} from "lucide-react";
import {Dialog} from "@radix-ui/react-dialog";
import {DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import TopupForm from "@/page/Wallet/TopupForm.jsx";
import WithdrawalForm from "@/page/Withdrawal/WithdrawalForm.jsx";
import TransferForm from "@/page/Wallet/TransferForm.jsx";

const Wallet = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="pt-10 w-full lg:w[60%]">
                <Card>
                    <CardHeader className="pb-9">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-5">
                                <WalletIcon size={30} />
                                <div>
                                    <CardTitle className="text-2xl"> My Wallet </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <p className="text-black text-m">
                                            #A234F
                                        </p>
                                        <CopyIcon size={13} className="cursor-pointer hover:text-slate-400" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <RefreshCw className="w-6 h-6 cursor-pointer hover:text-slate-400  " />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold">
                                ₹20000
                            </span>
                        </div>
                        <div className="flex gap-7 mt-5">
                            <Dialog>
                                <DialogTrigger>
                                    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-600">
                                        <UploadIcon/>
                                        <span className="text-sm mt-2">
                                            Add Money
                                        </span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Top Up Your Wallet
                                        </DialogTitle>
                                        <TopupForm></TopupForm>
                                    </DialogHeader>

                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-600">
                                        <UploadIcon/>
                                        <span className="text-sm mt-2">
                                            Withdraw Money
                                        </span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Request Withdrawal
                                        </DialogTitle>
                                        <WithdrawalForm> </WithdrawalForm>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-600">
                                        <ShuffleIcon/>
                                        <span className="text-sm mt-2">
                                            Transfer
                                        </span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-xl">
                                            Transfer to Other Wallet
                                        </DialogTitle>
                                        <TransferForm></TransferForm>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    );
};

export default Wallet;