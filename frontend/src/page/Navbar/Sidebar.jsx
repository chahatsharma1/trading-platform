import React from 'react';
import {ActivityIcon, BanknoteIcon, BriefcaseIcon, EyeIcon, HomeIcon, LandmarkIcon, LogOutIcon, UserIcon, WalletIcon} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { SheetClose } from "@/components/ui/sheet.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/page/State/Auth/Action.js";

const menu = [
    { name: "Home", path: "/home", icon: <HomeIcon className='h-6 w-6' /> },
    { name: "Portfolio", path: "/portfolio", icon: <BriefcaseIcon className='h-6 w-6' /> },
    { name: "Watchlist", path: "/watchlist", icon: <EyeIcon className='h-6 w-6' /> },
    { name: "Activity", path: "/activity", icon: <ActivityIcon className='h-6 w-6' /> },
    { name: "Wallet", path: "/wallet", icon: <WalletIcon className='h-6 w-6' /> },
    { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className='h-6 w-6' /> },
    { name: "Withdrawal", path: "/withdrawal", icon: <BanknoteIcon className='h-6 w-6' /> },
    { name: "Profile", path: "/profile", icon: <UserIcon className='h-6 w-6' /> },
    { name: "Logout", path: "/", icon: <LogOutIcon className='h-6 w-6' /> }
];

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='mt-7 flex flex-col items-center space-y-4 bg-[#0F172A] min-h-screen py-6'>
            {menu.map((item) => (
                <div key={item.name}>
                    <SheetClose className="w-full">
                        <Button
                            variant="ghost"
                            className="flex items-center justify-start gap-4 py-5 w-60 text-[#F1F5F9] hover:bg-[#1E293B] hover:text-white transition"
                            onClick={() => {
                                navigate(item.path);
                                if (item.name === "Logout") {
                                    handleLogout();
                                }}}>
                            <span className="w-6">{item.icon}</span>
                            <p className="text-base">{item.name}</p>
                        </Button>
                    </SheetClose>
                </div>
            ))}
        </div>
    );
};
export default Sidebar;