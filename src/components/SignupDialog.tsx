import * as React from "react";
import { Modal, Button, TextInput, Text, Stack, Center, Checkbox } from "@mantine/core";
import _ from "lodash";
import { useDisclosure } from "@mantine/hooks";
import { PasswordInputWithSuggestions } from "./PasswordInputWithSuggestions";
import { createUser } from "../api";
import { CreateUserRequest } from "../api/CreateUserRequest";
import { showNotification } from "@mantine/notifications";

interface Props {
	isOpen: boolean;
	onSwitchToLogin(): void;
	onClose(): void;
	onSignup(token: string): void;
}

/**
 *
 */
export function SignupDialog(props: Props) {
	const [signupForm, setSignupForm] = React.useState<CreateUserRequest>({
		displayName: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = React.useState<string>("");
	const [agreesToTerms, setAgreesToTerms] = React.useState<boolean>(false);
	const [visible, { toggle }] = useDisclosure(false);
	const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
		undefined
	);

	async function sendSignup() {
		if (
			_.size(signupForm.displayName) > 2 &&
			_.size(signupForm.password) > 12
		) {
			try {
				props.onSignup((await createUser(signupForm)).token);
				showNotification({
					title: "Success",
					message: "You're signed up and logged in!",
					color: "green",
				});
				closeAndResetDialog();
			} catch (error) {
				showNotification({
					title: "Error",
					message: "There was an issue signing up",
					color: "red",
				});
			}
		}
	}

	function closeAndResetDialog() {
		props.onClose();
		setErrorMessage(undefined);
		setSignupForm({
			displayName: "",
			password: "",
		});
		setConfirmPassword("");
	}

	return (
		<Modal
			opened={props.isOpen}
			onClose={closeAndResetDialog}
			title="Sign up"
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
		>
			<Stack>
				<TextInput
					placeholder="Username"
					label="Username (optional)"
					description="You will be given an auto generated ID to use regardless, and you will be able to set one later"
					value={signupForm.displayName}
					onChange={(event) =>
						setSignupForm((oldSignupForm) => ({
							...oldSignupForm,
							displayName: event.target.value,
						}))
					}
				/>

				<PasswordInputWithSuggestions
					placeholder="your password"
					label="Password"
					withAsterisk
					value={signupForm.password}
					visible={visible}
					onVisibilityChange={toggle}
					onChange={(event) =>
						setSignupForm((oldSignupForm) => ({
							...oldSignupForm,
							password: event.target.value,
						}))
					}
				/>

				<PasswordInputWithSuggestions
					placeholder="confirm your password"
					label="Confirm Password"
					withAsterisk
					value={confirmPassword}
					visible={visible}
					onVisibilityChange={toggle}
					onChange={(event) => setConfirmPassword(event.target.value)}
					requirements={[
						{
							re: new RegExp(`${signupForm.password}`),
							label: "Matches your password",
						},
					]}
				/>

				<Checkbox
					label="I am over 18"
					required
					checked={agreesToTerms}
					onChange={(event) => setAgreesToTerms(event.target.checked)}
				/>

				<Button
					fullWidth
					disabled={!agreesToTerms || !signupForm.password || !confirmPassword}
					onClick={() => sendSignup()}
				>
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
