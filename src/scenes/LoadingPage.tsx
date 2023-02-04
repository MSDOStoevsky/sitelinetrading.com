import { Center, Loader } from "@mantine/core";
import * as React from "react";

export function LoadingPage() {
	return (
		<Center style={{ height: "100%" }}>
			<Loader variant="dots" />
		</Center>
	);
}
