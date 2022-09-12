import * as React from "react";
import { Title } from "@mantine/core";
import { Center } from "@mantine/core";

/**
 * The page to display to users when they've navigated to a bad route
 */
export function NoPage() {
	return (
		<Center style={{ height: "100%" }}>
			<Title order={1}>404: Not Found</Title>
		</Center>
	);
}
