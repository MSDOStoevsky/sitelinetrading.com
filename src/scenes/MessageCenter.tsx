import * as React from "react";
import { Tabs, Group, Divider, Stack, Indicator } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import _ from "lodash";
import { Chat } from "../components/Chat";
import styled from "@emotion/styled";

const MessageCenterWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;

const ChatWindow = styled(Stack)`
	flex: 1;
`;

/**
 * Message center
 */
export function MessageCenter() {
	const [threads, setThreads] = React.useState([
		{
			id: "123456XPOL",
			chat: [
				{
					id: "890MAJL",
					timestamp: Date.now(),
					message: "Some words",
					from: "dylettinga@gmail.com",
				},
				{
					id: "257AKPR",
					timestamp: Date.now(),
					message: "Some words",
					from: "sitelinefirearmsllc",
				},
			],
		},
		{
			id: "56KDLI2ZDQ",
			chat: [
				{
					id: "1PPPSL",
					timestamp: Date.now(),
					message: "You're gay",
					from: "dylettinga@gmail.com",
				},
			],
		},
	]);

	const [activeThread, setActiveThread] = React.useState<string | undefined>(
		undefined
	);

	const activeChat =
		activeThread &&
		_.find(threads, (thread) => {
			return thread.id === activeThread;
		})?.chat;

	return (
		<MessageCenterWrapper>
			<Stack>
				{_.map(threads, (thread) => {
					return (
						<div onClick={() => setActiveThread(thread.id)}>
							<Indicator>{thread.id}</Indicator>
						</div>
					);
				})}
			</Stack>
			<Divider orientation="vertical" />
			<ChatWindow>
				{activeChat &&
					_.map(activeChat, (chat) => {
						return (
							<Chat
								timestamp={String(chat.timestamp)}
								message={chat.message}
								from={chat.from}
								user={"sitelinefirearmsllc"}
							/>
						);
					})}
			</ChatWindow>
		</MessageCenterWrapper>
	);
}
