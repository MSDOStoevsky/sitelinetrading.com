import * as React from "react";
import {
	Tabs,
	Group,
	Divider,
	Stack,
	Indicator,
	ActionIcon,
	Textarea,
	createStyles,
	Paper,
	MediaQuery,
	TextInput,
	Button,
	ScrollArea,
	Skeleton,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconPencil, IconSend } from "@tabler/icons";
import _ from "lodash";
import { Chat } from "../components/Chat";
import styled from "@emotion/styled";
import { BaseProps } from "../utils/BaseProps";
import { useNavigate, useParams } from "react-router-dom";
import { Thread } from "../api/Thread";
import { getThread, postMessage, searchThreads } from "../api";
import { SearchExpression } from "../api/SearchExpression";

const MessageCenterWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;

const MessageView = styled(Stack)`
	flex: 1;
	height: calc(100vh - calc(var(--mantine-header-height, 0px) + 48px));
`;

const ChatWindow = styled(ScrollArea)`
	flex: 1;
`;

const useStyles = createStyles((theme, _params, getRef) => ({
	sendButton: {
		height: "auto",
	},
}));

const UserReplyForm = styled.div`
	display: flex;
	gap: 1rem;

	.ReplyForm {
		flex: 1;
	}
`;

/**
 * Message center
 */
export function MessageCenter(props: BaseProps) {
	const { classes } = useStyles();
	const { id } = useParams();
	const search = useLocation().search;
	const ref = new URLSearchParams(search).get("ref");
	const targetUserId = new URLSearchParams(search).get("user");
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [message, setMessage] = React.useState<string>(
		ref ? `Regarding ${ref}` : ""
	);
	const [availableThreads, setAvailableThreads] = React.useState<
		undefined | Array<{ _id: string; user1: string; user2: string }>
	>(undefined);

	const [searchExpression, setSearchExpression] =
		React.useState<SearchExpression>({
			page: 0,
			pageSize: 50,
			filterExpression: {
				user1: props.userId,
				user2: props.userId,
			},
			orderBy: {
				field: "",
				order: "DESC",
			},
			select: "*",
		});

	/*
	{
		id: "123456XPOL",
		user1: "890MAJL",
		user2: "257AKPR",
		chat: [
			{
				id: "890MAJL",
				timestamp: Date.now(),
				message: "Some words",
			},
			{
				id: "257AKPR",
				timestamp: Date.now(),
				message: "Some words",
			},
		],
	}*/
	const [thread, setThread] = React.useState<Thread | undefined>(undefined);

	React.useEffect(() => {
		loadThread();
	}, []);

	React.useEffect(() => {
		loadAvailableThreads();
	}, [searchExpression]);

	async function loadAvailableThreads() {
		if (!id) {
			return;
		}

		try {
			setAvailableThreads((await searchThreads(searchExpression)).data);
		} catch (error) {
		} finally {
			//loadThread();
			setIsLoading(false);
		}
	}

	async function loadThread() {
		if (!id) {
			return;
		}

		try {
			setThread(await getThread(id));
		} catch (error) {
		} finally {
			//loadThread();
		}
	}

	async function sendMessage() {
		if (!id && !targetUserId) {
			return;
		}
		await postMessage(id, { message });
	}

	return (
		<MessageCenterWrapper>
			<MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
				<Paper p="md" withBorder>
					<Stack>
						<TextInput placeholder="Filter" />
						{!id && targetUserId ? (
							<Button
								variant="filled"
								fullWidth
								rightIcon={<IconPencil />}
							>
								{targetUserId}
							</Button>
						) : null}
						{_.map(availableThreads, (thread) => {
							const otherUser =
								thread.user1 === props.userId
									? thread.user2
									: thread.user1;
							return (
								<Button
									key={thread._id}
									variant={
										thread.user1 === id ||
										thread.user2 === id
											? "filled"
											: "subtle"
									}
									fullWidth
									onClick={() =>
										navigate(
											`/account/message-center/${thread}`
										)
									}
								>
									{otherUser}
								</Button>
							);
						})}
					</Stack>
				</Paper>
			</MediaQuery>
			<MessageView>
				<ChatWindow>
					<Stack>
						{thread &&
							_(thread.chat)
								.sortBy((chat) => chat.timestamp)
								.map((chat) => {
									return (
										<Chat
											key={_.uniqueId("chat")}
											timestamp={chat.timestamp}
											message={chat.message}
											user={"sitelinefirearmsllc"}
											isMe={chat.userId === props.userId}
										/>
									);
								})
								.value()}
					</Stack>
				</ChatWindow>
				<UserReplyForm>
					<Textarea
						className="ReplyForm"
						placeholder="Reply"
						value={message}
						onChange={(event) => setMessage(event.target.value)}
					/>
					<ActionIcon
						className={classes.sendButton}
						color="blue"
						title="Send"
						size="xl"
						variant="filled"
						onClick={sendMessage}
						disabled={!id && !targetUserId}
					>
						<IconSend />
					</ActionIcon>
				</UserReplyForm>
			</MessageView>
		</MessageCenterWrapper>
	);
}
