import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useAuth } from "../context/AuthContext";

function HomePage() {
    const {isAutenticated} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
		if (isAutenticated) navigate('/tasks');

	}, [isAutenticated]);

    return <div className="text-3xl text-center w-full col-start-1 col-end-6">this page is in process of creation ... ;)</div>;
}

export default HomePage;