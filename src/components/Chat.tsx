import { Alert, createStyles } from "@mantine/core";
import * as React from "react";

interface Message {
	timestamp: number;
	message: string;
	user: string;
	isMe: boolean;
}

const useStyles = createStyles((theme, _params, getRef) => ({
	myMessage: {
		marginLeft: "40%",
		wordBreak: "break-word"
	},
	otherMessage: {
		marginRight: "40%",
		wordBreak: "break-word"
	},
}));

export function Chat(props: Message) {
	const { classes } = useStyles();

	return (
		<Alert
			className={props.isMe ? classes.myMessage : classes.otherMessage}
			title={`${props.user} ${new Intl.DateTimeFormat("en-US", {
				dateStyle: "short",
				timeStyle: "short",
			}).format(props.timestamp)}`}
			radius="xl"
			color={props.isMe ? undefined : "dark"}
		>
			{props.message}
		</Alert>
	);
}
