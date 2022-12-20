import {
	Container,
	Stack,
	Radio,
	Button,
	TextInput,
	Title,
} from "@mantine/core";
import * as React from "react";
import { LockableInput } from "../components/LocakbleInput";
import { BaseProps } from "../utils/BaseProps";

export function AccountSettings(props: BaseProps) {
	const [accountSettings, setAccountSettings] = React.useState({
		id: props.userId,
		email: "dylettinga@gmail.com",
		displayName: "",
	});

	React.useEffect(() => {}, []);

	return (
		<Container size="xs" px="xs">
			<Stack spacing="xl">
				<Title order={1}>{accountSettings.id}</Title>

				<TextInput
					placeholder="Jon Doe"
					description="This must be unique and cannot be changed"
					label="Your display name"
					size="md"
					value={accountSettings.displayName}
					disabled={!!accountSettings.displayName}
				/>

				<LockableInput
					placeholder="Your email"
					label="Your email"
					description="Used only for notifications"
					size="md"
					value={accountSettings.email}
				/>

				<Radio.Group
					orientation="vertical"
					label="Email preferences"
					description="How often would you like notifications"
					size="md"
				>
					<Radio
						value="everything"
						label="Message center and update log notifications"
					/>
					<Radio
						value="message-center"
						label="Only message center related notifications"
					/>
					<Radio value="none" label="No emails" />
				</Radio.Group>

				<Button fullWidth={false}>Save Changes</Button>
			</Stack>
		</Container>
	);
}
