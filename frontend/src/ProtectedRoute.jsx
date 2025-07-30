import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Skeleton } from './components/ui/skeleton';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useSelector(store => store.auth);
    const location = useLocation();

    if (loading && !user) {
        return (
            <div className="min-h-screen p-8">
                <Skeleton className="h-16 w-full mb-8" />
                <div className="space-y-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && !user.userRole?.includes(role)) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;