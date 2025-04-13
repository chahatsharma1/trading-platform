import React from "react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Menu, SearchIcon } from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar.jsx";
import Sidebar from "@/page/Navbar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar = () => {
    const navigate = useNavigate();
    const {auth} =useSelector(store =>store)

    return (
        <div className="px-2 py-3 z-50 bg-[#0F172A] text-[#F1F5F9] sticky top-0 left-0 right-0 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center gap-3">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-11 w-11 text-[#F1F5F9] hover:bg-[#1E293B]">
                            <Menu className="h-7 w-7" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        className="w-72 bg-[#0F172A] border-r-0 text-[#F1F5F9]" side="left">
                        <SheetHeader>
                            <SheetTitle>
                                <div className="text-3xl flex justify-center items-center h-1">
                                    <Avatar className="w-15 h-10 mt-10">
                                        <AvatarImage src="src/assets/logo.png" />
                                    </Avatar>
                                    <div className="mt-10 ml-2">
                                        <span className="font-bold text-gray-300">TradeX</span>
                                    </div>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <p onClick={() => navigate("/home")} className="text-sm lg:text-base cursor-pointer text-[#F1F5F9]">
                    TradeX
                </p>
                <div className="p-0 ml-9">
                    <Button
                        className="w-100 flex items-center gap-3 text-[#F1F5F9] bg-[#1E293B] hover:bg-[#1E293B]">
                        <SearchIcon className="text-[#F1F5F9]" />
                        <p className="text-[#F1F5F9]">Search</p>
                    </Button>
                </div>
            </div>
            <div>
                <Avatar onClick={() => navigate("/profile")} className="cursor-pointer">
                    <AvatarFallback className="bg-gray-700 text-white">{auth.user.fullName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Navbar;
