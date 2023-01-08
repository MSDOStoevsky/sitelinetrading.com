import * as React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

interface Props {
	children: React.ReactNode;
	onProhibited(): void;
	isLoggedIn: boolean;
}

export function ProtectedRoute(props: Props): JSX.Element {
	if (props.isLoggedIn) {
		return <>{props.children}</>;
	} else {
		props.onProhibited();
		return <Navigate to="/" replace />;
	}
}
