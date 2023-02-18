import * as React from "react";
import {
	Stack,
	ActionIcon,
	Textarea,
	createStyles,
	MediaQuery,
	TextInput,
	Button,
	ScrollArea,
	Navbar,
	Drawer,
} from "@mantine/core";
import { IconLayoutSidebar, IconPencil, IconSend } from "@tabler/icons";
import _ from "lodash";
import { Chat } from "../../components/Chat";
import styled from "@emotion/styled";
import { BaseProps } from "../../utils/BaseProps";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import { Chat as Message, Thread } from "../../api/Thread";
import { getThread, postMessage, searchThreads, startThread } from "../../api";
import { InputButtonPair } from "../../components/InputButtonPair";
import { MessageSearchExpression } from "../../api/MessageSearchExpression";
import { Helmet } from "react-helmet";
import { showNotification } from "@mantine/notifications";

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

function getTargetUserFromThread(thread: Thread, userId: string): { userId: string, displayName: string } {
	return thread.userId1 === userId ? { userId: thread.userId2, displayName: thread.displayName2 } : {userId: thread.userId1, displayName: thread.displayName };
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
	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
	const [threadId, setThreadId] = React.useState<string | undefined>(undefined);
	const [threadMessages, setThreadMessages] = React.useState<Array<Message> | undefined>(undefined);
	// const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [message, setMessage] = React.useState<string>(
		refQueryParam
			? `Regarding https://sitelinetrading.com/listings/${refQueryParam}...`
			: ""
	);

	const viewportRef = React.useRef<HTMLDivElement | null>();

	const [availableThreads, setAvailableThreads] = React.useState<
		undefined | Array<Thread>
	>(undefined);

	const [isNewThread, setIsNewThread] = React.useState<boolean>(false);

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

	React.useEffect(() => {
		/*
		const loadthreadInterval = setInterval(() => {
			if (id) {
				loadThread();
			}
		}, 2000);
		setChatRefreshInterval({ intervalId: loadthreadInterval });

		return () => {
			clearInterval(chatRefreshInterval);
		};*/
	}, []);

	React.useEffect(() => {
		loadAvailableThreads();
	}, [searchExpression, id]);

	React.useEffect(() => {
		if ( _.isEmpty(availableThreads) ) {
			return;
		}
	}, [availableThreads]);

	React.useEffect(() => {
		if ( _.isEmpty(threadId) ) {
			return;
		}

		loadThread(threadId!)
	}, [threadId]);


	async function loadAvailableThreads() {
		try {
			const threads = (await searchThreads(searchExpression)).data;

			if ( _.isEmpty(threads) ) {
				if ( id ) {
					setThreadId(undefined);
					setIsNewThread(true);
				} else {
					return;
				}
			}

			const foundThread = _.find(threads, (thread) => {
				const targetUserFromThread =
					getTargetUserFromThread(thread, props.myId)!;

				return targetUserFromThread.userId === id;
			});

			if ( foundThread ) {
				setThreadId(foundThread.id);
			} else if ( id ) {
				setThreadId(undefined);
				setIsNewThread(true);
			}

			setAvailableThreads(threads);
		} catch (error) {
			console.log(error);
		} finally {
			//loadThread();
			// setIsLoading(false);
		}
	}

	async function loadThread(threadId: string) {
		try {
			const data = (await getThread(threadId)).data;
			setThreadMessages(data);
		} catch (error) {
			showNotification({
				title: "Error",
				message: "There was an issue loading this user",
				color: "red",
			});
		} finally {
			//loadThread();
		}
	}

	async function sendMessage() {
		if (!id) {
			return;
		}

		try {
			if (isNewThread) {
				const newThread = await startThread({
					myId: props.myId,
					userId: id,
					initialMessage: message,
				});
				if ( newThread.data ) {
					setThreadId(newThread.data.insertedId);
					loadAvailableThreads();
					setIsNewThread(false);
				}
			} else if (threadId) {
				await postMessage(threadId, {
					userId: props.myId,
					message,
				});
			}
		} finally {
			setMessage("");
			if (threadId) {
				loadThread(threadId);
			}
		}
	}

	return (
		<>
			<Helmet>
				<title>Siteline Trading | Messages</title>
			</Helmet>
			<MessageCenterWrapper>
				<Drawer
					opened={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
					padding="xs"
				>	
					<TextInput
						placeholder="Filter"
						onChange={(event) => {
							setSearchExpression((oldSearchExpression) => {
								return {
									...oldSearchExpression,
									filterExpression: {
										...oldSearchExpression.filterExpression,
										userIds: event.target.value,
										displayName: event.target.value,
									},
								};
							});
						}}
						pb="xs"
					/>
					<Stack>
						{isNewThread && (
							<Button
								variant="filled"
								fullWidth
								rightIcon={<IconPencil />}
							>
								{id}
							</Button>
						)}
						{_.map(availableThreads, (thread) => {
							const threadId = thread.id;
							const targetUserFromThread =
								getTargetUserFromThread(thread, props.myId)!;
							return (
								<Button
									key={threadId}
									variant={
										targetUserFromThread.userId === id ? "filled" : "subtle"
									}
									fullWidth
									onClick={() => {
										navigate(
											`/account/message-center/${targetUserFromThread.userId}`
										);
										setIsNewThread(false);
										setIsDrawerOpen(false);
									}}
								>
									{targetUserFromThread.displayName || targetUserFromThread.userId}
								</Button>
							);
						})}
					</Stack>
				</Drawer>
				<MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
					<Navbar
						p="xs"
						width={{ sm: 350 }}
						hiddenBreakpoint={"sm"}
						hidden
						zIndex={100}
					>
						<Navbar.Section mt="xs" mb="xs">
							<Stack>
								<TextInput
									placeholder="Filter"
									onChange={(event) => {
										setSearchExpression(
											(oldSearchExpression) => {
												return {
													...oldSearchExpression,
													filterExpression: {
														...oldSearchExpression.filterExpression,
														userIds: event.target.value,
														displayName:
															event.target.value,
													},
												};
											}
										);
									}}
								/>
								{isNewThread && (
									<Button
										variant="filled"
										fullWidth
										rightIcon={<IconPencil />}
									>
										{id}
									</Button>
								)}
							</Stack>
						</Navbar.Section>

						<Navbar.Section
							grow
							component={ScrollArea}
							mx="-xs"
							px="xs"
						>
							<Stack>
								{_.map(availableThreads, (thread) => {
									const threadId = thread.id;
									const targetUserFromThread =
										getTargetUserFromThread(
											thread,
											props.myId
										)!;

									return (
										<Button
											key={threadId}
											variant={
												targetUserFromThread.userId === id
													? "filled"
													: "subtle"
											}
											fullWidth
											onClick={() => {
												setIsNewThread(false);
												navigate(
													`/account/message-center/${targetUserFromThread.userId}`
												);
											}}
										>
										{targetUserFromThread.displayName || targetUserFromThread.userId}
										</Button>
									);
								})}
							</Stack>
						</Navbar.Section>
					</Navbar>
				</MediaQuery>
				<MessageView>
					<ChatWindow
						viewportRef={(node) => onViewportRefAvailable(node)}
					>
						<Stack>
							{
								_(threadMessages)
									.sortBy((chat) => chat.timestamp)
									.map((chat) => {
										return (
											<Chat
												key={_.uniqueId("chat")}
												timestamp={chat.timestamp}
												message={chat.message}
												user={
													chat.displayName || chat.userId
												}
												isMe={
													chat.userId === props.myId
												}
											/>
										);
									})
									.value()}
						</Stack>
					</ChatWindow>
					<InputButtonPair>
						<MediaQuery
							largerThan={"xs"}
							styles={{ display: "none" }}
						>
							<ActionIcon
								className={classes.sendButton}
								color="blue"
								title="Send"
								size="xl"
								variant="filled"
								onClick={() => setIsDrawerOpen(true)}
							>
								<IconLayoutSidebar />
							</ActionIcon>
						</MediaQuery>
						<Textarea
							className="ReplyForm"
							placeholder={
								id
									? `Message user ${id}`
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
							disabled={!id || !message}
						>
							<IconSend />
						</ActionIcon>
					</InputButtonPair>
				</MessageView>
			</MessageCenterWrapper>
		</>
	);
}
