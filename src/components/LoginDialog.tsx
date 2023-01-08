import * as React from "react";
import {
	Modal,
	Button,
	TextInput,
	Text,
	PasswordInput,
	Stack,
	Center,
	Alert,
} from "@mantine/core";
import _ from "lodash";
import { login } from "../api";
import { UserLoginRequest } from "../api/UserLoginRequest";
import { IconAlertCircle } from "@tabler/icons";

interface Props {
	isOpen: boolean;
	onSwitchToSignup(): void;
	onSuccessfulLogin(token: string): void;
	onClose(): void;
}

/**
 *
 */
export function LoginDialog(props: Props) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [loginForm, setLoginForm] = React.useState<UserLoginRequest>({
		accountIdOrDisplayName: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
		undefined
	);

	async function attemptLogin() {
		setIsLoading(true);
		try {
			const loginResult = await login(loginForm);
			if (loginResult.status === "error") {
				setErrorMessage(loginResult.message);
			} else {
				props.onSuccessfulLogin(loginResult.token);
				closeAndResetDialog();
			}
		} catch (error) {
			setErrorMessage(_.toString(error));
		} finally {
			setIsLoading(false);
		}
	}

	function closeAndResetDialog() {
		props.onClose();
		setErrorMessage(undefined);
		setLoginForm({
			accountIdOrDisplayName: "",
			password: "",
		});
	}

	return (
		<Modal
			opened={props.isOpen}
			onClose={closeAndResetDialog}
			title="Log in"
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
		>
			<Stack>
				<TextInput
					placeholder="your account ID or display name"
					label="Account ID or Display Name"
					onChange={(event) =>
						setLoginForm((oldLoginForm) => ({
							...oldLoginForm,
							accountIdOrDisplayName: event.target.value,
						}))
					}
					withAsterisk
				/>

				<PasswordInput
					placeholder="your password"
					label="Password"
					withAsterisk
					onChange={(event) =>
						setLoginForm((oldLoginForm) => ({
							...oldLoginForm,
							password: event.target.value,
						}))
					}
				/>
				{errorMessage ? (
					<Alert
						icon={<IconAlertCircle size={16} />}
						title="Login issue"
						color="red"
					>
						{errorMessage}
					</Alert>
				) : null}
				<Button
					fullWidth
					onClick={() => attemptLogin()}
					loading={isLoading}
				>
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
