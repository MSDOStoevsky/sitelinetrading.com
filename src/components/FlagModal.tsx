import * as React from "react";
import {
	Modal,
	Button,
	Group,
} from "@mantine/core";
import _ from "lodash";
import { flagProduct } from "../api/flagServlet";
import { showNotification } from "@mantine/notifications";

interface Props {
	userId?: string;
	productToFlag: string | undefined;
	onClose(): void;
	onDisagree(): void;
	onAgree(): void;
}

/**
 *
 */
export function FlagModal(props: Props) {

	async function handleAgreeButtonClick() {
		if ( !props.userId || !props.productToFlag ) {
			return;
		}
		try { 
			await flagProduct({productId: props.productToFlag!, userId: props.userId});
			showNotification({
				title: "Success",
				message: "Flag submitted",
				color: "green"
			});
		} catch (error) {
			showNotification({
				title: "Error",
				message: "error trying to flag",
				color: "red"
			});
		}
	}

	return (
		<Modal
			opened={!!props.productToFlag}
			onClose={props.onClose}
			title="Are you sure you want to flag this as spam, abusive, or scam? (This cannot be undone)"
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
		>
			<Group position="apart" grow>
				<Button fullWidth variant="subtle" onClick={() => props.onDisagree()}>
					No
				</Button>
				<Button
					fullWidth
					onClick={() => {
						handleAgreeButtonClick();
						props.onAgree();
					}}
				>
					Yes
				</Button>
			</Group>
		</Modal>
	);
}
