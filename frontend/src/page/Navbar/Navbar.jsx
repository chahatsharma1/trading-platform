import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";
import { Menu, SearchIcon, Sun, Moon, Coins, LayoutDashboard } from "lucide-react";
import Sidebar from "@/page/Navbar/Sidebar.jsx";

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const [, payload] = token.split(".");
        if (!payload) return false;
        const decoded = JSON.parse(atob(payload));
        return Date.now() < decoded.exp * 1000;
    } catch {
        return false;
    }
};

const useScrollHandler = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isScrolled;
};

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const [query, setQuery] = useState("");
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const isScrolled = useScrollHandler();

    const token = localStorage.getItem("jwt");
    const isAuthenticated = isTokenValid(token);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            navigate(`/search?query=${query}`);
            setQuery("");
        }
    };

    const AppLogo = () => (
        <Link to="/" className="flex items-center gap-2">
            <Coins className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-foreground">TradeX</span>
        </Link>
    );

    const ThemeToggler = () => (
        <Button onClick={toggleTheme} variant="outline" size="icon" className="rounded-full">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );

    const UserAvatar = () => (
        <Avatar onClick={() => navigate("/profile")} className="cursor-pointer h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.fullName?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
        </Avatar>
    );

    if (["/login", "/signup", "/forgot-password"].includes(location.pathname) || location.pathname.startsWith("/admin")) {
        return null;
    }

    const navClassName = `sticky top-0 left-0 right-0 z-50 transition-colors duration-300 ${
    isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-background"
}`;

    if (location.pathname === "/") {
        return (
            <header className={navClassName}>
                <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
                    <AppLogo />
                    <div className="flex items-center gap-2">
                        <ThemeToggler />
                        {isAuthenticated ? (
                            <>
                                <Button onClick={() => navigate('/home')} variant="outline">
                                    <LayoutDashboard className="h-4 w-4 mr-2" />
                                    My Dashboard
                                </Button>
                                <UserAvatar />
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} variant="outline">Login</Button>
                                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        );
    }

    return (
        <div className={navClassName}>
            <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-72 bg-background border-r-0" side="left">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link to="/home" className="flex items-center gap-2 px-4 py-2">
                                        <Coins className="w-8 h-8 text-primary" />
                                        <span className="text-2xl font-bold text-foreground">TradeX</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                    <Link to="/home" className="hidden md:flex items-center gap-2">
                        <Coins className="w-7 h-7 text-primary" />
                        <span className="text-xl font-bold text-foreground">TradeX</span>
                    </Link>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            type="text"
                            placeholder="Search coins..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="pl-10 h-10 w-full bg-muted border-border rounded-full"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggler />
                    <UserAvatar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;