import { Container, Stack, Radio, Button, TextInput } from "@mantine/core";
import * as React from "react";
import { LockableInput } from "../components/LocakbleInput";
export function AccountSettings() {
	return (
		<Container size="xs" px="xs">
			<Stack spacing="xl">
				<LockableInput
					placeholder="Your email"
					label="Your email"
					size="md"
					value="dylettinga@gmail.com"
				/>

				<Radio.Group
					orientation="vertical"
					label="Email preferences"
					description="This is anonymous"
					size="md"
				>
					<Radio value="everything" label="Everything" />
					<Radio
						value="message-center"
						label="Only message center related notifications"
					/>
					<Radio value="none" label="No emails" />
				</Radio.Group>

				<Radio.Group
					orientation="vertical"
					label="Select your favorite framework/library"
					description="This is anonymous"
					size="md"
				>
					<Radio value="react" label="React" />
					<Radio value="svelte" label="Svelte" />
					<Radio value="ng" label="Angular" />
					<Radio value="vue" label="Vue" />
				</Radio.Group>

				<Button fullWidth={false}>Save Changes</Button>
			</Stack>
		</Container>
	);
}
