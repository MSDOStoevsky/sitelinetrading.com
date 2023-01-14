import * as React from "react";
import {
	Modal,
	Button,
	TextInput,
	Text,
	Stack,
	Center,
	Switch,
	SimpleGrid,
	Textarea,
	Image,
	Group,
} from "@mantine/core";
import _ from "lodash";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Product } from "../../api/Product";
import { updateProduct } from "../../api";
import { showNotification } from "@mantine/notifications";

interface Props {
	isOpen: boolean;
	onClose(): void;
	onAgree(): void;
	onDisagree(): void;
}

/**
 *
 */
export function ConfirmDeleteModal(props: Props) {
	return (
		<Modal
			opened={props.isOpen}
			onClose={props.onClose}
			title="Are you sure you want to remove your listing?"
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
		>
			<Group position="apart" grow>
				<Button fullWidth onClick={() => props.onDisagree()}>
					No
				</Button>
				<Button
					fullWidth
					variant="subtle"
					onClick={() => props.onAgree()}
				>
					Yes
				</Button>
			</Group>
		</Modal>
	);
}
