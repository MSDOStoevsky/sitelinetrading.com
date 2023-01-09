import * as React from "react";
import {
	Stack,
	ActionIcon,
	Textarea,
	createStyles,
	Paper,
	MediaQuery,
	TextInput,
	Button,
	ScrollArea,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconPencil, IconSend } from "@tabler/icons";
import _ from "lodash";
import { Chat } from "../../components/Chat";
import styled from "@emotion/styled";
import { BaseProps } from "../../utils/BaseProps";
import { useNavigate, useParams } from "react-router-dom";
import { Thread } from "../../api/Thread";
import { getThread, postMessage, searchThreads, startThread } from "../../api";
import { InputButtonPair } from "../../components/InputButtonPair";
import { MessageSearchExpression } from "../../api/MessageSearchExpression";

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

function getTargetUserIdFromThread(
	thread: Thread | undefined,
	userId: string
): string | undefined {
	if (!thread) {
		return undefined;
	}
	return thread.userIds[thread.userIds.indexOf(userId) === 1 ? 0 : 1];
}

interface Props extends BaseProps {
	myId: string;
}

/**
 * Message center
 */
export function MessageCenter(props: Props) {
	const { classes } = useStyles();
	const { id } = useParams();
	const search = useLocation().search;
	const navigate = useNavigate();
	const refQueryParam = new URLSearchParams(search).get("ref");
	const userQueryParam = new URLSearchParams(search).get("user");
	const [thread, setThread] = React.useState<Thread | undefined>(undefined);
	// const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [message, setMessage] = React.useState<string>(
		refQueryParam ? `Regarding ${refQueryParam}...` : ""
	);
	const viewportRef = React.useRef<HTMLDivElement | null>();

	const [availableThreads, setAvailableThreads] = React.useState<
		undefined | Array<Thread>
	>(undefined);

	const onViewportRefAvailable = React.useCallback(
		(node: HTMLDivElement | null) => {
			if (viewportRef.current) {
				viewportRef.current.scrollTo({
					top: viewportRef.current.scrollHeight,
					behavior: "smooth",
				});
			}

			if (node !== null) {
				viewportRef.current = node;
			}
		},
		[]
	);

	const [searchExpression, setSearchExpression] =
		React.useState<MessageSearchExpression>({
			page: 0,
			pageSize: 50,
			filterExpression: {},
		});

	const targetUserId =
		getTargetUserIdFromThread(thread, props.myId) || userQueryParam;

	React.useEffect(() => {
		loadThread();
	}, [id]);

	React.useEffect(() => {
		loadAvailableThreads();
	}, [searchExpression]);

	React.useEffect(() => {
		const foundThread = _.find(availableThreads, (availableThread) => {
			return _.includes(availableThread.userIds, userQueryParam);
		});

		if (!id && foundThread) {
			navigate(
				`/account/message-center/${foundThread._id}?ref=${refQueryParam}`
			);
		}
	}, [availableThreads]);

	async function loadAvailableThreads() {
		try {
			setAvailableThreads((await searchThreads(searchExpression)).data);
		} catch (error) {
			console.log(error);
		} finally {
			//loadThread();
			// setIsLoading(false);
		}
	}

	async function loadThread() {
		if (!id) {
			setThread(undefined);
			return;
		}

		try {
			setThread((await getThread(id)).data);
		} catch (error) {
		} finally {
			//loadThread();
		}
	}

	async function sendMessage() {
		if (!id && !targetUserId) {
			return;
		}

		try {
			if (!id && targetUserId) {
				await startThread({
					userIds: [props.myId, targetUserId],
					initialMessage: {
						userId: props.myId,
						message,
					},
				});
			} else if (id) {
				await postMessage(id, {
					userId: props.myId,
					message,
				});
			}
		} finally {
			loadThread();
			setMessage("");
		}
	}

	return (
		<MessageCenterWrapper>
			<MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
				<Paper p="md" withBorder>
					<Stack>
						<TextInput
							placeholder="Filter"
							onChange={(event) => {
								setSearchExpression((oldSearchExpression) => {
									return {
										...oldSearchExpression,
										filterExpression: {
											...oldSearchExpression.filterExpression,
											userIds: event.target.value,
										},
									};
								});
							}}
						/>
						{!id && userQueryParam ? (
							<Button
								variant="filled"
								fullWidth
								rightIcon={<IconPencil />}
							>
								{userQueryParam}
							</Button>
						) : null}
						{_.map(availableThreads, (thread) => {
							const threadId = thread._id;
							const targetUserIdFromThread =
								getTargetUserIdFromThread(thread, props.myId)!;
							return (
								<Button
									key={threadId}
									variant={
										threadId === id ? "filled" : "subtle"
									}
									fullWidth
									onClick={() =>
										navigate(
											`/account/message-center/${threadId}`
										)
									}
								>
									{targetUserIdFromThread}
								</Button>
							);
						})}
					</Stack>
				</Paper>
			</MediaQuery>
			<MessageView>
				<ChatWindow
					viewportRef={(node) => onViewportRefAvailable(node)}
				>
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
											user={chat.userId}
											isMe={chat.userId === props.myId}
										/>
									);
								})
								.value()}
					</Stack>
				</ChatWindow>
				<InputButtonPair>
					<Textarea
						className="ReplyForm"
						placeholder={
							targetUserId
								? `Message user ${targetUserId}`
								: "No user to send to"
						}
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
				</InputButtonPair>
			</MessageView>
		</MessageCenterWrapper>
	);
}
