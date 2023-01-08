import * as React from "react";
import {
	ActionIcon,
	Anchor,
	Box,
	Button,
	Center,
	Container,
	createStyles,
	Divider,
	Group,
	Input,
	Loader,
	Navbar,
	Skeleton,
	Stack,
	Text,
	Textarea,
	Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { Feedback, UserFeedback as UserFeedbackData } from "../../api/Feedback";
import _ from "lodash";
import { InputButtonPair } from "../../components/InputButtonPair";
import { IconSend } from "@tabler/icons";
import { getFeedback, postFeedback } from "../../api";
import { showNotification } from "@mantine/notifications";
import { LoadingPage } from "../LoadingPage";

const useStyles = createStyles((theme, _params, getRef) => ({
	sendButton: {
		height: "auto",
	},
}));

interface Props {
	myId: string;
}

export function UserFeedback(props: Props) {
	const { id } = useParams();
	const { classes } = useStyles();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [feedback, setFeedback] = React.useState<
		UserFeedbackData | undefined
	>(undefined);
	const [message, setMessage] = React.useState<string>("");

	const userId = id || feedback?.userId;
	const isThisMe = props.myId === userId;

	React.useEffect(() => {
		if (id) {
			loadFeedback();
		}
	}, []);

	async function loadFeedback() {
		setIsLoading(true);
		try {
			const feedback = await getFeedback(id!);
			setFeedback(feedback.data);
		} catch (error) {
			showNotification({
				title: "Error",
				message: "There was an issue loading feedback",
				color: "red",
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function sendFeedback() {
		if (!message) {
			return;
		}

		try {
			await postFeedback(feedback?._id!, {
				userId: userId!,
				fromId: props.myId,
				message,
			});

			showNotification({
				title: "Success",
				message: "Feedback sent",
				color: "green",
			});
		} catch (error) {
			showNotification({
				title: "Error",
				message: (error as any).message,
				color: "red",
			});
		} finally {
			loadFeedback();
			setMessage("");
		}
	}

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<>
			{/*
				<Navbar height={55} p="xs" withBorder zIndex={99}>
					<Group position="center">
						<Button variant="subtle">Feedback</Button>
						<Button variant="subtle">Listings</Button>
					</Group>
				</Navbar>
			*/}
			<Container size="xs" px="xs">
				<Stack spacing="xl">
					<Skeleton visible={isLoading}>
						<Center>
							<Title order={1}>{id}</Title>
						</Center>
					</Skeleton>

					{isThisMe ? null : (
						<InputButtonPair>
							<Textarea
								className="ReplyForm"
								placeholder="Your feedback"
								disabled={isLoading}
								onChange={(event) =>
									setMessage(event.target.value)
								}
							/>

							<ActionIcon
								className={classes.sendButton}
								color="blue"
								title="Send"
								size="xl"
								variant="filled"
								onClick={sendFeedback}
								disabled={isLoading || !message}
							>
								<IconSend />
							</ActionIcon>
						</InputButtonPair>
					)}

					<Skeleton visible={isLoading}>
						{_.isEmpty(feedback?.feedback) ? (
							<Center>User has no feedback</Center>
						) : null}
						{_.map(feedback?.feedback, (singleFeedback, key) => {
							return (
								<Box key={key}>
									<Text fz="xs">
										<Anchor
											onClick={() =>
												navigate(
													`/users/${singleFeedback.fromId}`
												)
											}
										>
											{singleFeedback.fromId}
										</Anchor>
									</Text>
									{singleFeedback.message} <Divider my="sm" />
								</Box>
							);
						})}
					</Skeleton>
				</Stack>
			</Container>
		</>
	);
}
