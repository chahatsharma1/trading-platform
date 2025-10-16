import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="bg-card text-card-foreground rounded-radius shadow-xl p-12 w-full max-w-md text-center">
                <h1 className="text-8xl font-extrabold text-destructive mb-4">403</h1>
                <h2 className="text-3xl font-semibold mb-4">Access Denied</h2>
                <p className="text-muted-foreground mb-8">
                    You do not have permission to view this page.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md shadow-md hover:shadow-lg">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default AccessDenied;