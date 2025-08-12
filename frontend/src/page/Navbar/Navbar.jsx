import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Menu, SearchIcon, Sun, Moon, Coins, LayoutDashboard, LogOut, User,HomeIcon, BriefcaseIcon, EyeIcon, ActivityIcon, WalletIcon, LandmarkIcon, BanknoteIcon} from "lucide-react";

const menuItems = [
    { name: "Dashboard", path: "/home", icon: <HomeIcon className='h-5 w-5' /> },
    { name: "Portfolio", path: "/portfolio", icon: <BriefcaseIcon className='h-5 w-5' /> },
    { name: "Watchlist", path: "/watchlist", icon: <EyeIcon className='h-5 w-5' /> },
    { name: "Activity", path: "/activity", icon: <ActivityIcon className='h-5 w-5' /> },
    { name: "Wallet", path: "/wallet", icon: <WalletIcon className='h-5 w-5' /> },
    { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className='h-5 w-5' /> },
    { name: "Withdrawal", path: "/withdrawal", icon: <BanknoteIcon className='h-5 w-5' /> },
];

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

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        navigate("/login");
    };

    const AppLogo = () => (
        <Link to="/" className="flex shrink-0 items-center gap-2">
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

    const UserProfileDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.picture || "/user.png"} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {user?.fullName?.[0]?.toUpperCase() || <User />}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24" align="end" forceMount>
                <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
                                <UserProfileDropdown />
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
                <div className="flex items-center gap-x-2 lg:gap-x-4">
                    <AppLogo />
                    <nav className="hidden md:flex items-center gap-x-1 lg:gap-x-2">
                        {menuItems.map((item) => (
                            <Link to={item.path} key={item.name}>
                                <Button
                                    variant="ghost"
                                    className={`px-3 text-sm font-medium ${location.pathname.startsWith(item.path) ? "text-primary" : "text-muted-foreground"}`}>
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative hidden lg:block w-full max-w-xs">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="pl-10 h-10 w-full bg-muted border-border rounded-full"
                        />
                    </div>
                    <ThemeToggler />
                    <UserProfileDropdown />
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-72 bg-background border-r-0" side="left">
                                <SheetHeader>
                                    <SheetTitle>
                                        <AppLogo />
                                    </SheetTitle>
                                </SheetHeader>
                                <div className='mt-6 space-y-2'>
                                    {menuItems.map((item) => (
                                        <SheetClose asChild key={item.name}>
                                            <Link to={item.path}>
                                                <Button
                                                    variant="ghost"
                                                    className={`w-full flex items-center justify-start gap-3 rounded-md px-3 py-6 text-base transition-colors ${
                                                        location.pathname.startsWith(item.path)
                                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                    }`}>
                                                    {item.icon}
                                                    <span>{item.name}</span>
                                                </Button>
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;