import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Coins, SearchIcon, Sun, Moon, LayoutDashboard, User, LogOut, HomeIcon, BriefcaseIcon, EyeIcon, ActivityIcon, WalletIcon, LandmarkIcon, BanknoteIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const menuItems = [
    { name: "Dashboard", path: "/home", icon: <HomeIcon className='h-5 w-5' /> },
    { name: "Portfolio", path: "/portfolio", icon: <BriefcaseIcon className='h-5 w-5' /> },
    { name: "Watchlist", path: "/watchlist", icon: <EyeIcon className='h-5 w-5' /> },
    { name: "Activity", path: "/activity", icon: <ActivityIcon className='h-5 w-5' /> },
    { name: "Wallet", path: "/wallet", icon: <WalletIcon className='h-5 w-5' /> },
    { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className='h-5 w-5' /> },
    { name: "Withdrawal", path: "/withdrawal", icon: <BanknoteIcon className='h-5 w-5' /> },
];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const [query, setQuery] = useState("");
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    const token = localStorage.getItem("jwt");
    const decodedJwt = token ? jwtDecode(token) : null;
    const userRole = decodedJwt?.roles;
    const isAuthenticated = !!token;

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
        navigate("/");
    };

    const AppLogo = () => (
        <Link to="/" className="flex shrink-0 items-center gap-2">
            <Coins className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-foreground">TradeX</span>
        </Link>
    );

    const ThemeToggler = () => (
        <Button onClick={toggleTheme} size="icon" className="rounded-full">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );

    const UserProfileDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={"/user.png"} alt={user?.name} />
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

    const navClassName = `sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background`;

    // Access Denied Page
    if (location.pathname === "/access-denied") {
        return (
            <header className={navClassName}>
                <div className="px-4 sm:px-6 h-16 flex items-center justify-center">
                    <AppLogo />
                </div>
            </header>
        );
    }

    // Admin Pages
    if (location.pathname.startsWith("/admin")) {
        return (
            <div className={navClassName}>
                <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                    <AppLogo />
                    <div className="flex items-center gap-3">
                        <ThemeToggler />
                        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Landing Page
    if (location.pathname === "/") {
        return (
            <header className={navClassName}>
                <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
                    <AppLogo />
                    <div className="flex items-center gap-2">
                        <ThemeToggler />
                        {isAuthenticated ? (
                            <Button
                                onClick={() => navigate(userRole?.includes("ROLE_ADMIN") ? "/admin/dashboard" : "/home")}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 rounded-md flex items-center gap-2">
                                <LayoutDashboard className="h-4 w-4" />
                                My Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')}>Login</Button>
                                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        );
    }

    // All other pages
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
                                    className={`px-3 text-sm font-medium ${location.pathname.startsWith(item.path) ? "text-primary" : "text-muted-foreground"}`}
                                >
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
                </div>
            </div>
        </div>
    );
};

export default Navbar;
