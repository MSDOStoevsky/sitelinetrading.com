import * as React from "react";
import {
	Modal,
	Button,
	TextInput,
	Text,
	PasswordInput,
	Stack,
	Center,
} from "@mantine/core";
import _ from "lodash";

interface Props {
	isOpen: boolean;
	onSwitchToSignup(): void;
	onClose(): void;
}

/**
 *
 */
export function LoginDialog(props: Props) {
	return (
		<Modal
			opened={props.isOpen}
			onClose={props.onClose}
			title="Log in"
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
		>
			<Stack>
				<TextInput
					placeholder="Your email"
					label="Email"
					withAsterisk
				/>

				<PasswordInput
					placeholder="Your password"
					label="Password"
					withAsterisk
				/>

				<Button fullWidth onClick={() => _.noop}>
					Log in
				</Button>
				<Center>
					<Text>
						Don't have an account?{" "}
						<Button
							variant="subtle"
							onClick={() => props.onSwitchToSignup()}
						>
							Sign up
						</Button>
					</Text>
				</Center>
			</Stack>
		</Modal>
	);
}
