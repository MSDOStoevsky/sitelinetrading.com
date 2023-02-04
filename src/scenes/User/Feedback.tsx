import * as React from "react";
import {
	ActionIcon,
	Anchor,
	Box,
	Center,
	Container,
	createStyles,
	Divider,
	Drawer,
	Navbar,
	ScrollArea,
	Skeleton,
	Stack,
	Text,
	Textarea,
	Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { UserFeedback as UserFeedbackData } from "../../api/Feedback";
import _ from "lodash";
import { InputButtonPair } from "../../components/InputButtonPair";
import { IconSend } from "@tabler/icons";
import { getFeedback, postFeedback } from "../../api";
import { showNotification } from "@mantine/notifications";
import { getUser } from "../../api/userServlet";
import { User } from "../../api/User";

const useStyles = createStyles((theme, _params, getRef) => ({
	sendButton: {
		height: "auto",
	},
}));

interface Props {
	myId: string;
	id: string;
	displayName?: string;
	isFeedbackDrawerOpen: boolean;
	closeFeedbackDrawer(): void;
}

export function Feedback(props: Props) {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [feedback, setFeedback] = React.useState<
		UserFeedbackData | undefined
	>(undefined);
	const [message, setMessage] = React.useState<string>("");
	const [user, setUser] = React.useState<User | undefined>(undefined);

	const isThisMe = props.myId === props.id;

	async function getUserInfo() {
		setIsLoading(true);
		try {
			const user = await getUser(props.id);
			setUser(user.data);
		} catch (error) {
			setUser(undefined);
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		loadFeedback();
		getUserInfo();
	}, []);

	async function loadFeedback() {
		setIsLoading(true);
		try {
			const feedback = await getFeedback(props.id);
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
				userId: props.id,
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

	const feedbackHeader = (
		<Stack spacing="xl">
			<Skeleton visible={isLoading}>
				<Center>
					<Title order={1}>{user?.displayName || props.id}</Title>
				</Center>
			</Skeleton>
			{isThisMe ? null : (
				<InputButtonPair>
					<Textarea
						className="ReplyForm"
						placeholder="Your feedback"
						disabled={isLoading}
						onChange={(event) => setMessage(event.target.value)}
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
		</Stack>
	);

	const feedbackBody = (
		<Stack spacing="xl">
			{_.isEmpty(feedback?.feedback) ? (
				<Center>User has no feedback</Center>
			) : null}
			{_.map(feedback?.feedback, (singleFeedback, key) => {
				return (
					<Box key={key}>
						<Text fz="xs">
							<Anchor
								onClick={() =>
									navigate(`/users/${singleFeedback.fromId}`)
								}
							>
								{singleFeedback.fromId}
							</Anchor>
						</Text>
						{singleFeedback.message} <Divider my="sm" />
					</Box>
				);
			})}
		</Stack>
	);
	return (
		<>
			<Drawer
				opened={props.isFeedbackDrawerOpen}
				onClose={() => props.closeFeedbackDrawer()}
				padding="xs"
			>
				{feedbackHeader}
				{feedbackBody}
			</Drawer>
			<Navbar
				p="xs"
				width={{ sm: 350 }}
				hiddenBreakpoint={"sm"}
				hidden
				zIndex={100}
			>
				<Navbar.Section mt="xs">{feedbackHeader}</Navbar.Section>
				<Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
					{feedbackBody}
				</Navbar.Section>
			</Navbar>
		</>
	);
}
