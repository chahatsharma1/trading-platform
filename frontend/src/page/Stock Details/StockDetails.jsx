import React, { useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { DotIcon, BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StockChart from "@/page/Home/StockChart.jsx";
import TradingForm from "@/page/Stock Details/TradingForm.jsx";

const StockDetails = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="p-5 min-h-screen bg-[#0F172A] text-[#F1F5F9]">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400" />
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-[#F1F5F9]">BTC</p>
                            <DotIcon className="text-[#94A3B8]" />
                            <p className="text-sm text-[#94A3B8]">Bitcoin</p>
                        </div>
                        <p className="text-2xl font-bold text-[#F1F5F9]">₹6,851,107</p>
                        <p className="text-sm text-red-500">754.041 (0.95578%)</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-[#1E293B] text-white border border-[#334155] hover:bg-[#334155]"
                    >
                        <BookmarkIcon size={18} />
                    </Button>
                    <Button
                        onClick={() => setDialogOpen(true)}
                        className="rounded-lg px-6 py-2 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    >
                        TRADE
                    </Button>
                </div>
            </div>

            <div>
                <StockChart />
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-[#1E293B] border-none text-[#F1F5F9]">
                    <DialogHeader>
                        <DialogTitle className="text-[#F1F5F9]">Trade Bitcoin</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-[#94A3B8]">
                        <TradingForm />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default StockDetails;
