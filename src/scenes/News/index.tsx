import * as React from "react";
import {
	Container,
	Stack,
	Text,
	Title,
	List,
	Box,
	Paper,
	ActionIcon,
	Center,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import styled from "@emotion/styled";

const ReleaseEntry = styled(Stack)`
	.mantine-Modal-title {
		margin-right: 9px;
		flex: 1;
	}
`;

export function News() {
	return (
		<Container size="xs" px="xs">
			<Stack>
				<Paper withBorder p="md">
					<ActionIcon
						component="a"
						target="_blank"
						href="https://github.com/MSDOStoevsky"
					>
						<IconBrandGithub />
					</ActionIcon>
				</Paper>
				<ReleaseEntry>
					<Title order={2}>Release 2023.1.7</Title>
					<Text>
						Hi, everyone! Thanks for joining me in this project.
						This is going to be a pretty rough alpha and I hope you
						can all forgive the rough edges, as I can guarantee the
						support will be continuous so long as this sees use. I
						intend to stick to a few principles while maintaining
						this app that I hope are a significant improvement over
						the poor practices I see in other applications:
					</Text>
					<List>
						<List.Item>
							I will do nothing to sacrifice user privacy. I do
							not store payment, location, or browsing habits.
							(Note, though, I must store your login session for
							practical reasons)
						</List.Item>
						<List.Item>
							I have no plans to collect subscription fees (I will
							be begging for donation money, however).
						</List.Item>
						<List.Item>
							All code for the backend and frontend will be open
							source. Please feel free to contribute changes and
							criticisms via GitHub.
						</List.Item>
						<List.Item>
							I will maintain a policy of over-transparency. I
							will tell you what I plan to do; I will tell you
							what I don't plan to do.
						</List.Item>
					</List>
				</ReleaseEntry>
			</Stack>
		</Container>
	);
}
