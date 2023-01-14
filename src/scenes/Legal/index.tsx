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
	Navbar,
	Group,
} from "@mantine/core";
import styled from "@emotion/styled";

const NewsPost = styled(Stack)`
	.mantine-Modal-title {
		margin-right: 9px;
		flex: 1;
	}
`;

export function Legal() {
	return (
		<Container size="xs" px="xs">
			<Stack>
				<NewsPost>
					<Title order={2}>FAQ</Title>

					<Title order={3}>Nothing yet</Title>
					<Text></Text>
				</NewsPost>
			</Stack>
		</Container>
	);
}
