import {
	Container,
	Stack,
	Radio,
	Button,
	TextInput,
	Title,
} from "@mantine/core";
import * as React from "react";
import { Helmet } from "react-helmet";
import { EmailPreferences, User } from "../../api/User";
import { LockableInput } from "../../components/LocakbleInput";

interface Props {
	me: User;
}

export function AccountSettings(props: Props) {
	const [immutableAccountSettings, setImmutableAccountSettings] =
		React.useState<Partial<User>>({
			userId: "",
			createdTimestamp: 0,
		});
	const [mutableAccountSettings, setMutableAccountSettings] = React.useState<
		Partial<User>
	>({
		email: "",
		displayName: "",
		emailPreferences: "none",
	});

	React.useEffect(() => {
		const { userId, createdTimestamp, ...mutableAccountSettings } =
			props.me;
		setImmutableAccountSettings({ userId, createdTimestamp });
		setMutableAccountSettings(mutableAccountSettings);
	}, []);

	return (
		<>
			<Helmet>
				<title>Siteline Trading | Account Settings</title>
			</Helmet>
			<Container size="xs" px="xs">
				<Stack spacing="xl">
					<Title order={1}>{immutableAccountSettings.userId}</Title>

					<TextInput
						placeholder="Jon Doe"
						description="This must be unique and cannot be changed"
						label="Your display name"
						size="md"
						value={mutableAccountSettings.displayName}
						onChange={(event) => {
							setMutableAccountSettings((oldAccountSettings) => ({
								...oldAccountSettings,
								displayName: event.target.value,
							}));
						}}
						disabled={!!mutableAccountSettings.displayName}
					/>

					<LockableInput
						placeholder="Your email"
						label="Your email"
						description="Used only for notifications (not reccomended)"
						size="md"
						value={mutableAccountSettings.email}
						onChange={(event) => {
							setMutableAccountSettings((oldAccountSettings) => ({
								...oldAccountSettings,
								email: event.target.value,
							}));
						}}
					/>

					<Radio.Group
						orientation="vertical"
						label="Email preferences"
						description="How often would you like notifications"
						size="md"
						value={mutableAccountSettings.emailPreferences}
						onChange={(value: EmailPreferences) => {
							setMutableAccountSettings((oldAccountSettings) => ({
								...oldAccountSettings,
								emailPreferences: value,
							}));
						}}
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
		</>
	);
}
