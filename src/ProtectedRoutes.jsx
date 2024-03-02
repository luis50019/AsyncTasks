import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
function ProtectedRoutes() {
    const {loading, isAutenticated}= useAuth();

    if(loading) return  <div className="w-full text-5xl text-center py-9 text-blue-800">Loading...</div>
    if(!loading && !isAutenticated) return <Navigate to="/login" replace/>


    return <Outlet/>;
}

export default ProtectedRoutes;