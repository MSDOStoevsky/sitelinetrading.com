import * as React from "react";
import { AppShell } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { Home } from "./scenes/Home";
import { Listings } from "./scenes/Listings";
import { NoPage } from "./scenes/NoPage";
import { TopNav } from "./components/TopNav";
import { Listing } from "./scenes/Listing";
import { AccountHome } from "./scenes/AccountHome";
import { MyListings } from "./scenes/MyListings";
import { MessageCenter } from "./scenes/MessageCenter";
import { AccountSettings } from "./scenes/AccountSettings";
import { IWantToSell } from "./scenes/IWantToSell";
import { LoginDialog } from "./components/LoginDialog";
import { SignupDialog } from "./components/SignupDialog";
import { Post } from "./scenes/Post";

export function App() {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(true);
	const [isLoginDialogOpen, setIsLoginDialogOpen] =
		React.useState<boolean>(false);
	const [isSignupDialogOpen, setIsSignupDialogOpen] =
		React.useState<boolean>(false);

	const [searchEntry, setSearchEntry] = React.useState<string>("");

	return (
		<AppShell
			padding="xl"
			header={
				<TopNav
					isLoggedIn={isLoggedIn}
					onLoginClick={() => {
						setIsLoginDialogOpen(true);
					}}
					onSignupClick={() => {
						setIsSignupDialogOpen(true);
					}}
					onSearch={setSearchEntry}
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
			<Routes>
				<Route index element={<Listings searchEntry={searchEntry} />} />
				<Route path="home" element={<Home />} />
				<Route path="listings/:id" element={<Listing />} />
				<Route path="post" element={<Post />} />
				<Route
					path="account"
					element={<AccountSettings userId="890MAJL" />}
				/>
				<Route
					path="account/i-want-to-sell"
					element={<IWantToSell />}
				/>
				<Route
					path="account/listings"
					element={<MyListings userId="890MAJL" />}
				/>
				<Route
					path="account/message-center"
					element={<MessageCenter userId="890MAJL" />}
				/>
				<Route
					path="account/message-center/:id"
					element={<MessageCenter userId="890MAJL" />}
				/>
				<Route
					path="account/account-settings"
					element={<AccountSettings userId="890MAJL" />}
				/>
				<Route path="*" element={<NoPage />} />
			</Routes>
			<LoginDialog
				isOpen={!!isLoginDialogOpen}
				onClose={() => setIsLoginDialogOpen(false)}
				onSwitchToSignup={() => {
					setIsLoginDialogOpen(false);
					setIsSignupDialogOpen(true);
				}}
			/>
			<SignupDialog
				isOpen={!!isSignupDialogOpen}
				onClose={() => setIsSignupDialogOpen(false)}
				onSwitchToLogin={() => {
					setIsSignupDialogOpen(false);
					setIsLoginDialogOpen(true);
				}}
			/>
		</AppShell>
	);
}
