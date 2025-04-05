import React from "react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Menu, SearchIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import Sidebar from "@/page/Navbar/Sidebar.jsx";

const Navbar = () => {
    return (
        <div className='px-2 py-3 z-50 bg--background sticky
        top-0 left-0 right-0 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                        <Menu className = "h-7 w-7" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-72 border-r-0 flex flex-col justify-center" side='left'>
                    <SheetHeader>
                            <SheetTitle>
                                <div className="text-3xl flex justify-center items-center h-1">
                                    <Avatar className= "w-15 h-10 mt-10 " >
                                        <AvatarImage src = "src/assets/logo.png"/>
                                    </Avatar>
                                    <div className="mt-10">
                                    <span className= "font-bold text-gray-600">TradeX</span>
                                    </div>
                                </div>
                                </SheetTitle>
                        </SheetHeader>
                        <Sidebar></Sidebar>
                    </SheetContent>
                </Sheet>
                <p className="text-sm lg:text-base cursor-pointer">
                    TradeX
                </p>
                <div className="p-0 ml-9">
                    <Button variant="outline" className="flex items-center gap-3">
                        <SearchIcon></SearchIcon>
                    </Button>
                </div>
            </div>
            <div>
                <Avatar>
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
export default Navbar