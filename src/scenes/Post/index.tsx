import {
	Button,
	Textarea,
	TextInput,
	Stack,
	Container,
	Image,
	SimpleGrid,
	Switch,
	LoadingOverlay,
	Select,
} from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCurrencyDollar, IconSend } from "@tabler/icons";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import * as React from "react";
import _ from "lodash";
import { addProduct, getMe } from "../../api";
import { Product } from "../../api/Product";
import { isFormValid } from "../../utils/isFormValid";
import { showNotification } from "@mantine/notifications";
import { User } from "../../api/User";
import { STATE_ABBREVIATIONS } from "../../utils/constants";

const defaultProduct = {
	title: "",
	description: "",
	value: "",
	openToTrade: true,
};

export function Post() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [files, setFiles] = React.useState<FileWithPath[]>([]);
	const [product, setProduct] =
		React.useState<Partial<Product>>(defaultProduct);
	const [me, setMe] = React.useState<User | undefined>(undefined);

	React.useEffect(() => {
		loadUser();
	}, []);

	async function loadUser() {
		setMe((await getMe()).data);
		setIsLoading(false);
	}

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
					autosize
					minRows={4}
					value={product.description}
					onChange={(event) =>
						setProduct((product) => ({
							...product,
							description: event.target.value,
						}))
					}
				/>

				<Select
					className="State"
					label="State"
					placeholder="State"
					withAsterisk
					data={STATE_ABBREVIATIONS}
					value={product.state}
					onChange={(value) => {
						setProduct((product) => ({
							...product,
							state: value || "",
						}));
					}}
				/>

				<TextInput
					placeholder="Value"
					label="Value"
					withAsterisk
					icon={<IconCurrencyDollar size={16} />}
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
							const addProductResult = await addProduct({
								...product,
								userId: me?.userId,
								image: files[0],
							} as Product);
							showNotification({
								title: "Success!",
								message: "Your post is live",
								color: "green",
							});
							setProduct(defaultProduct);
						} catch (error) {
							showNotification({
								title: "Oh...",
								message:
									"There was an issue posting this, try again later",
								color: "red",
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
