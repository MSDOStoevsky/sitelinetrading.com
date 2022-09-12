import { MantineProvider } from "@mantine/core";

import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MantineProvider>
	</React.StrictMode>
);
