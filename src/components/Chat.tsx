import { Alert } from "@mantine/core";
import * as React from "react";

interface Message {
	timestamp: string;
	message: string;
	from: string;
	user: string;
}

/**
 *
 */
export function Chat(props: Message) {
	return (
		<Alert
			title={props.timestamp}
			radius="xl"
			color={props.from === props.user ? "dark" : undefined}
		>
			{props.message}
		</Alert>
	);
}
