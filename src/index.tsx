import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			withCSSVariables
			theme={{ colorScheme: "dark" }}
		>
			<NotificationsProvider position="top-center" autoClose={5000}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</NotificationsProvider>
		</MantineProvider>
	</React.StrictMode>
);
