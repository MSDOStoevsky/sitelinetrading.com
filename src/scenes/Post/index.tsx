import {
	Alert,
	Button,
	Textarea,
	TextInput,
	Stack,
	Modal,
	Container,
	Image,
	SimpleGrid,
	Switch,
	LoadingOverlay,
} from "@mantine/core";
import { Group, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX, IconSend } from "@tabler/icons";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import * as React from "react";
import _ from "lodash";
import { addProduct } from "../../api";
import { Product } from "../../api/Product";
import { isFormValid } from "../../utils/isFormValid";
import { showNotification } from "@mantine/notifications";

export function Post() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [files, setFiles] = React.useState<FileWithPath[]>([]);
	const [product, setProduct] = React.useState<Partial<Product>>({
		userId: "1234566789",
		title: "",
		description: "",
		value: "",
		openToTrade: true,
	});

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file);
		return (
			<Image
				key={index}
				src={imageUrl}
				imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
			/>
		);
	});

	return (
		<Container size="xs" px="xs">
			<div style={{ width: 400, position: "relative" }}>
				<LoadingOverlay visible={isLoading} overlayBlur={2} />
				{/* ...other content */}
			</div>
			<Stack>
				<Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
					<Text align="center">Drop images here</Text>
				</Dropzone>

				<SimpleGrid
					cols={1}
					breakpoints={[{ maxWidth: "sm", cols: 1 }]}
					mt={previews.length > 0 ? "xl" : 0}
				>
					{previews}
				</SimpleGrid>

				<TextInput
					placeholder="Title"
					label="Title"
					withAsterisk
					value={product.title}
					onChange={(event) =>
						setProduct((product) => ({
							...product,
							title: event.target.value,
						}))
					}
				/>

				<Textarea
					description="Provide a detailed description of any modifications, issues, or quirks"
					label="Description"
					placeholder="Description"
					withAsterisk
					value={product.description}
					onChange={(event) =>
						setProduct((product) => ({
							...product,
							description: event.target.value,
						}))
					}
				/>

				<TextInput
					placeholder="Value"
					label="Value"
					withAsterisk
					value={product.value}
					onChange={(event) =>
						setProduct((product) => ({
							...product,
							value: event.target.value,
						}))
					}
				/>

				<Switch
					label="I am open to trades"
					checked={product.openToTrade}
					onChange={() => {
						setProduct((product) => ({
							...product,
							openToTrade: !product.openToTrade,
						}));
					}}
				/>

				<Button
					disabled={isFormValid(product)}
					onClick={async () => {
						setIsLoading(true);
						try {
							await addProduct({
								...product,
								image: files[0],
							} as Product);
							showNotification({
								title: "Success!",
								message: "Hey there, your code is awesome! 🤥",
							});
						} catch (error) {
							showNotification({
								title: "Oh...",
								message: "Hey there, your code is awesome! 🤥",
							});
						} finally {
							setIsLoading(false);
						}
					}}
					leftIcon={<IconSend size={14} />}
				>
					Submit
				</Button>
			</Stack>
		</Container>
	);
}
