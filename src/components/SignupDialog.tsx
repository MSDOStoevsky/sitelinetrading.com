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
	onSwitchToLogin(): void;
	onClose(): void;
}

/**
 *
 */
export function SignupDialog(props: Props) {
	function sendSignup() {}

	return (
		<Modal
			opened={props.isOpen}
			onClose={props.onClose}
			title="Sign up"
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

				<PasswordInput
					placeholder="Your password"
					label="Confirm Password"
					withAsterisk
				/>

				<Button fullWidth onClick={() => _.noop}>
					Sign up
				</Button>

				<Center>
					<Text>
						Already have an account?{" "}
						<Button
							variant="subtle"
							onClick={() => props.onSwitchToLogin()}
						>
							Login
						</Button>
					</Text>
				</Center>
			</Stack>
		</Modal>
	);
}
