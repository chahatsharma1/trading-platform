import React, { useState } from "react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Menu, SearchIcon } from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar.jsx";
import Sidebar from "@/page/Navbar/Sidebar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input.jsx";
import { searchCoin } from "@/page/State/Coin/Action.js";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    const [query, setQuery] = useState("");

    if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password") {
        return null;
    }

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            dispatch(searchCoin(query, localStorage.getItem("jwt")));
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <div className="px-2 py-3 z-50 bg-[#0F172A] text-[#F1F5F9] sticky top-0 left-0 right-0 flex items-center border-b border-gray-700 relative">
            {/* LEFT - Menu & Logo */}
            <div className="flex items-center gap-3">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-11 w-11 text-[#F1F5F9] hover:bg-[#1E293B]"
                        >
                            <Menu className="h-7 w-7" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        className="w-72 bg-[#0F172A] border-r-0 text-[#F1F5F9]"
                        side="left"
                    >
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
                <p
                    onClick={() => navigate("/home")}
                    className="text-sm lg:text-base cursor-pointer text-[#F1F5F9]"
                >
                    TradeX
                </p>
            </div>

            {/* CENTER - Search bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="pl-10 text-center h-10 w-90 text-white bg-[#1E293B] border border-gray-600 placeholder-gray-400"
                    />
                </div>
            </div>

            {/* RIGHT - Avatar */}
            <div className="ml-auto">
                <Avatar onClick={() => navigate("/profile")} className="cursor-pointer">
                    <AvatarFallback className="bg-gray-700 text-white">
                        {user?.fullName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Navbar;
