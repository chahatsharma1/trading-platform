import React from 'react';
import {ActivityIcon, BanknoteIcon, BriefcaseIcon, EyeIcon, HomeIcon, LandmarkIcon, LogOutIcon, UserIcon, WalletIcon } from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {SheetClose} from "@/components/ui/sheet.jsx";


const menu = [
    {name: "Home", path: "/", icon: <HomeIcon className='h-6 w-6'/>},
    {name: "Portfolio", path: "/portfolio", icon: <BriefcaseIcon className='h-6 w-6'/>},
    {name: "Watchlist", path: "/watchlist", icon: <EyeIcon className='h-6 w-6'/>},
    {name: "Activity", path: "/activity", icon: <ActivityIcon className='h-6 w-6'/>},
    {name: "Wallet", path: "/wallet", icon: <WalletIcon className='h-6 w-6'/>},
    {name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className='h-6 w-6'/>},
    {name: "Withdrawal", path: "/withdrawal", icon: <BanknoteIcon className='h-6 w-6'/>},
    {name: "Profile", path: "/profile", icon: <UserIcon className='h-6 w-6'/>},
    {name: "Logout", path: "/", icon: <LogOutIcon className='h-6 w-6'/>}
]
const Sidebar = () => {
    return (
        <div className= 'mt-7 flex flex-col items-center space-y-5'>
            {menu.map((item) => (
                <div key={item.name}>
                    <SheetClose className="w-full">
                        <Button variant="outline" className="flex items-center gap-5 py-6 w-60">
                            <span className="w-1">{item.icon} </span>
                        <p>{item.name}</p>
                        </Button>
                    </SheetClose>
                </div>
            ))}
        </div>
    );
}
export default Sidebar;