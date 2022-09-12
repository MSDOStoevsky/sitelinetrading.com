import {
	Alert,
	Button,
	Textarea,
	TextInput,
	Stack,
	Modal,
} from "@mantine/core";
import { Group, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX, IconSend } from "@tabler/icons";
import { IconAlertCircle } from "@tabler/icons";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import * as React from "react";
import _ from "lodash";

export function IWantToSell() {
	const theme = useMantineTheme();
	const [isNoticeOpen, setIsNoticeOpen] = React.useState(true);
	return (
		<>
			<Stack>
				<Dropzone
					onDrop={(files) => console.log("accepted files", files)}
					onReject={(files) => console.log("rejected files", files)}
					maxSize={3 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
				>
					<Group
						position="center"
						spacing="xl"
						style={{ minHeight: 220, pointerEvents: "none" }}
					>
						<Dropzone.Accept>
							<IconUpload
								size={50}
								stroke={1.5}
								color={
									theme.colors[theme.primaryColor][
										theme.colorScheme === "dark" ? 4 : 6
									]
								}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								size={50}
								stroke={1.5}
								color={
									theme.colors.red[
										theme.colorScheme === "dark" ? 4 : 6
									]
								}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto size={50} stroke={1.5} />
						</Dropzone.Idle>

						<div>
							<Text size="xl" inline>
								Drag images here or click to select files
							</Text>
							<Text size="sm" color="dimmed" inline mt={7}>
								Attach as many files as you like, each file
								should not exceed 5mb
							</Text>
						</div>
					</Group>
				</Dropzone>

				<Textarea
					description="Provide a detailed description of any modifications, issues, or quirks"
					label="Description"
					placeholder="Description"
					withAsterisk
				/>

				<TextInput
					placeholder="Value"
					label="Estimated Value"
					description="What would you hope to get for this?"
					withAsterisk
				/>

				<Button leftIcon={<IconSend size={14} />}>Submit</Button>
			</Stack>
			<Modal
				opened={isNoticeOpen}
				onClose={() => {
					setIsNoticeOpen(false);
				}}
				withCloseButton={false}
				padding={0}
				overlayOpacity={0.6}
				overlayColor="#000"
				overlayBlur={2}
			>
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Please read before continuing"
					withCloseButton
					closeButtonLabel="Close notice"
					onClose={() => {
						setIsNoticeOpen(false);
					}}
				>
					The value of your firearm is determined by a lot of factors.
					Some of these factors include timing, the state of the
					market, and our current inventory. Our goal is still to give
					you a very competitive price given the circumstances.
				</Alert>
			</Modal>
		</>
	);
}
