import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, veryfyTokenRequest } from "../api/auth";

import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider ")
	}

	return context;
}

export function AuthProvider({ children }) {

	const [user, setUser] = useState(null);
	const [errors, setErrors] = useState([]);
	const [isAutenticated, setIsAutenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	const singUp = async (user) => {
		try {
			const res = await registerRequest(user);
			setUser(res.data);
			setIsAutenticated(true);

		} catch (error) {
			console.log(error.response.data)
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
				return
			}
				setErrors([error.response.data]);
		}
	}

	const singIn = async (user) => {
		try {
			const res = await loginRequest(user);
			setUser(res.data);
			setIsAutenticated(true);

		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
				return
			}
			setErrors([error.response.data]);
		}
	}
	const logOut = () => {
		Cookies.remove("token")
		setIsAutenticated(false);
		setErrors([])
	}


	useEffect(() => {
		const timer = setTimeout(() => {
			if (errors.length > 0 && errors !== null) {
				setErrors([]);
			}
		}, 5000)

		return () => clearTimeout(timer);
	}, [errors]);

	useEffect(() => {
		async function checkLogin() {
			const cookies = Cookies.get();

			if (!cookies.token) {
				setIsAutenticated(false);
				setLoading(false);
				return setUser(null);
			}

			try {
				const res = await veryfyTokenRequest(cookies.token);
				if (!res.data) {
					setIsAutenticated(false);
					setLoading(false);
					return;
				}

				setIsAutenticated(true);
				setUser(res.data);
				setLoading(false);

			} catch (error) {
				console.error(error);
				setIsAutenticated(false);
				setLoading(false);
				setUser(null);
			}
		}

		checkLogin();
	}, []);

	return (
		<AuthContext.Provider value={{
			singIn,
			singUp,
			logOut,
			user,
			errors,
			isAutenticated,
			loading
		}}>
			{children}
		</AuthContext.Provider>
	);
}
