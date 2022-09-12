import * as React from "react";
import { Container, Textarea, Stack, Title, ActionIcon } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { Message } from "../../components/Message";
import styled from "@emotion/styled";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
	sendButton: {
		height: "auto",
	},
}));

const UserQuestionForm = styled.div`
	display: flex;
	gap: 1rem;

	.QuestionForm {
		flex: 1;
	}
`;

/**
 * Discussion
 */
export function Discussion() {
	const { classes } = useStyles();

	return (
		<Container size={"xl"}>
			<Title order={4}>Discussion</Title>
			<Stack>
				<UserQuestionForm>
					<Textarea
						className="QuestionForm"
						placeholder="Ask a question"
					/>
					<ActionIcon
						className={classes.sendButton}
						color="blue"
						title="Send"
						size="xl"
						variant="filled"
					>
						<IconSend />
					</ActionIcon>
				</UserQuestionForm>
				<Message
					timestamp="January 19th 2022"
					message="Does it take Glock mags?"
					replies={[
						{
							timestamp: "January 20th 2022",
							message: "Probably not...",
						},
					]}
				/>
				<Message
					timestamp="March 21th 2022"
					message="Is this still available?"
				/>
			</Stack>
		</Container>
	);
}
