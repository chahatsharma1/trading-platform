import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActivityIcon, BriefcaseIcon, EyeIcon, HomeIcon, LandmarkIcon, LogOutIcon, UserIcon, WalletIcon, BanknoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { SheetClose } from "@/components/ui/sheet.jsx";
import { logout } from "@/page/State/Auth/Action.js";

const menuItems = [
    { name: "Home", path: "/home", icon: <HomeIcon className='h-5 w-5' /> },
    { name: "Portfolio", path: "/portfolio", icon: <BriefcaseIcon className='h-5 w-5' /> },
    { name: "Watchlist", path: "/watchlist", icon: <EyeIcon className='h-5 w-5' /> },
    { name: "Activity", path: "/activity", icon: <ActivityIcon className='h-5 w-5' /> },
    { name: "Wallet", path: "/wallet", icon: <WalletIcon className='h-5 w-5' /> },
    { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className='h-5 w-5' /> },
    { name: "Withdrawal", path: "/withdrawal", icon: <BanknoteIcon className='h-5 w-5' /> },
    { name: "Profile", path: "/profile", icon: <UserIcon className='h-5 w-5' /> },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleNavigate = (item) => {
        navigate(item.path);
    };

    return (
        <div className='flex h-full flex-col justify-between p-4'>
            <div className='space-y-2'>
                {menuItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                        <Button
                            variant="ghost"
                            className={`w-full flex items-center justify-start gap-3 rounded-md px-3 py-6 text-base transition-colors ${
    location.pathname === item.path
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
}`}
                            onClick={() => handleNavigate(item)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            <SheetClose asChild>
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-3 rounded-md px-3 py-6 text-base text-red-500 hover:bg-red-500/10 hover:text-red-500"
                    onClick={handleLogout}
                >
                    <LogOutIcon className='h-5 w-5' />
                    <span>Logout</span>
                </Button>
            </SheetClose>
        </div>
    );
};

export default Sidebar;
