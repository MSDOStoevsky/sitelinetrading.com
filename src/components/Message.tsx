import { Alert, Button, Collapse, Spoiler } from "@mantine/core";
import * as React from "react";
import _ from "lodash";
import styled from "@emotion/styled";

interface Message {
	timestamp: string;
	message: string;
}

interface Props extends Message {
	replies?: Array<Message>;
}

const MarginLeft = styled.div`
	margin-left: 5rem;
`;

export function Message(props: Props) {
	const [showReplies, setShowReplies] = React.useState<boolean>(false);
	return (
		<>
			<Alert title={props.timestamp} radius="xl">
				{props.message}

				{props.replies && (
					<Button
						variant="subtle"
						onClick={() => {
							setShowReplies(!showReplies);
						}}
					>
						Show/Hide Replies
					</Button>
				)}
			</Alert>

			<Collapse in={showReplies}>
				<MarginLeft>
					{_.map(props.replies, (reply) => {
						return (
							<Alert
								key={reply.timestamp}
								title={reply.timestamp}
								radius="xl"
								color={"dark"}
							>
								{reply.message}
							</Alert>
						);
					})}
				</MarginLeft>
			</Collapse>
		</>
	);
}
