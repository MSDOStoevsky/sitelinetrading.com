import * as React from "react";
import { AppShell } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { News } from "./scenes/News";
import { Listings } from "./scenes/Listings";
import { NoPage } from "./scenes/NoPage";
import { TopNav } from "./components/TopNav";
import { Listing } from "./scenes/Listing";
import { MessageCenter } from "./scenes/MessageCenter";
import { AccountSettings } from "./scenes/AccountSettings";
import { LoginDialog } from "./components/LoginDialog";
import { SignupDialog } from "./components/SignupDialog";
import { Post } from "./scenes/Post";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { User } from "./scenes/User";
import { User as UserInterface } from "./api/User";
import { LoadingPage } from "./scenes/LoadingPage";
import { getMe } from "./api/userServlet";
import { Legal } from "./scenes/Legal";
import { resetHeader } from "./api";

export interface SearchEntry {
	text: string;
	state: string;
}

export function App() {
	const [isLoginDialogOpen, setIsLoginDialogOpen] =
		React.useState<boolean>(false);
	const [isSignupDialogOpen, setIsSignupDialogOpen] =
		React.useState<boolean>(false);

	const [searchEntry, setSearchEntry] = React.useState<SearchEntry>({
		text: "",
		state: "",
	});

	const [isInitializing, setIsInitializing] = React.useState<boolean>(true);
	const [me, setMe] = React.useState<UserInterface | undefined>(undefined);

	const myUserId = me?.id;

	const isLoggedIn = !!myUserId;

	async function login() {
		try {
			const me = await getMe({
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"sitelineKey"
					)}`,
				},
			});
			resetHeader(localStorage.getItem("sitelineKey") as string);
			setMe(me.data);
		} catch (error) {
			setMe(undefined);
		} finally {
			setIsInitializing(false);
		}
	}

	React.useEffect(() => {
		login();
	}, []);

	return (
		<AppShell
			padding="xl"
			style={{
				position: "relative"
			}}
			header={
				<TopNav
					userId={me?.id}
					onLoginClick={() => {
						setIsLoginDialogOpen(true);
					}}
					onLogoutClick={() => {
						localStorage.removeItem("sitelineKey");
						setMe(undefined);
					}}
					onSignupClick={() => {
						setIsSignupDialogOpen(true);
					}}
					onSearch={(value) => {
						setSearchEntry(value);
					}}
				/>
			}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			{isInitializing ? (
				<LoadingPage />
			) : (
				<Routes>
					<Route
						index
						element={<Listings searchEntry={searchEntry} />}
					/>
					<Route path="news" element={<News />} />
					<Route path="legal" element={<Legal />} />
					<Route
						path="users/:id"
						element={
							<ProtectedRoute
								onProhibited={() => setIsLoginDialogOpen(true)}
								isLoggedIn={isLoggedIn}
							>
								<User
									myId={me?.id!}
									displayName={me?.displayName}
								/>
							</ProtectedRoute>
						}
					/>
					<Route
						path="listings/:id"
						element={<Listing myId={me?.id} />}
					/>
					<Route
						path="post"
						element={
							<ProtectedRoute
								onProhibited={() => setIsLoginDialogOpen(true)}
								isLoggedIn={isLoggedIn}
							>
								<Post myId={me?.id!} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="account/message-center"
						element={
							<ProtectedRoute
								onProhibited={() => setIsLoginDialogOpen(true)}
								isLoggedIn={isLoggedIn}
							>
								<MessageCenter myId={me?.id!} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="account/message-center/:id"
						element={
							<ProtectedRoute
								onProhibited={() => setIsLoginDialogOpen(true)}
								isLoggedIn={isLoggedIn}
							>
								<MessageCenter myId={me?.id!} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="account/account-settings"
						element={
							<ProtectedRoute
								onProhibited={() => setIsLoginDialogOpen(true)}
								isLoggedIn={isLoggedIn}
							>
								{me ? <AccountSettings me={me} /> : null}
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NoPage />} />
				</Routes>
			)}
			<LoginDialog
				isOpen={!!isLoginDialogOpen}
				onClose={() => setIsLoginDialogOpen(false)}
				onSwitchToSignup={() => {
					setIsLoginDialogOpen(false);
					setIsSignupDialogOpen(true);
				}}
				onSuccessfulLogin={(token) => {
					localStorage.setItem("sitelineKey", token);
					login();
				}}
			/>
			<SignupDialog
				isOpen={!!isSignupDialogOpen}
				onClose={() => setIsSignupDialogOpen(false)}
				onSwitchToLogin={() => {
					setIsSignupDialogOpen(false);
					setIsLoginDialogOpen(true);
				}}
				onSignup={(token) => {
					localStorage.setItem("sitelineKey", token);
					login();
				}}
			/>
		</AppShell>
	);
}
