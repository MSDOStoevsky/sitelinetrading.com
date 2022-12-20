import * as React from "react";
import { Container, Paper, Stack, Text, Title } from "@mantine/core";
import styled from "@emotion/styled";

const QuickLinks = styled(Paper)`
	display: flex;
`;

export function Home() {
	return (
		<Container size="xs" px="xs">
			<Stack>
				<Title order={2}>[12/07/2022] Release 0.0.1</Title>
				<Text>
					<ul>
						<li>Alpha release</li>
					</ul>
				</Text>
			</Stack>
		</Container>
	);
}
