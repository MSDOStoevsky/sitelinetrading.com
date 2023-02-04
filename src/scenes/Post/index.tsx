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
	Alert,
	NativeSelect,
} from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCurrencyDollar, IconInfoCircle, IconSend } from "@tabler/icons";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import * as React from "react";
import _ from "lodash";
import { addProduct } from "../../api";
import { Product } from "../../api/Product";
import { isFormValid } from "../../utils/isFormValid";
import { showNotification } from "@mantine/notifications";
import { User } from "../../api/User";
import { STATE_ABBREVIATIONS } from "../../utils/constants";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../api/userServlet";
import { Helmet } from "react-helmet";

interface Props {
	myId: string;
}

const defaultProduct = {
	title: "",
	description: "",
	value: "",
	openToTrade: false,
};

export function Post(props: Props) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
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

	async function submitPost() {
		setIsLoading(true);
		try {
			const formData = new FormData();
			if (!_.isEmpty(files)) {
				const fileName = _.kebabCase(_.deburr(_.trim(product.title)));
				formData.append("file", files[0], fileName);
			}
			formData.append(
				"data",
				JSON.stringify({
					...product,
					userId: me?.userId,
				})
			);
			const addProductResult = await addProduct(formData);

			if (addProductResult.status === "failure") {
				showNotification({
					title: "Error",
					message: addProductResult.message,
					color: "red",
				});
			} else {
				showNotification({
					title: "Success!",
					message: "Your post is live",
					color: "green",
				});
				navigate(`/listings/${addProductResult.data.insertedId}`);
			}
		} catch (error) {
			showNotification({
				title: "Oh...",
				message: "There was an issue posting this, try again later",
				color: "red",
			});
		} finally {
			setIsLoading(false);
		}
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
		<>
			<Helmet>
				<title>Siteline Trading | Post</title>
			</Helmet>
			<Container size="xs" px="xs">
				<LoadingOverlay visible={isLoading} overlayBlur={2} />
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

					<NativeSelect
						className="State"
						label="State"
						placeholder="State"
						withAsterisk
						data={STATE_ABBREVIATIONS}
						value={product.state}
						onChange={(event) => {
							setProduct((product) => ({
								...product,
								state: event.target.value || "",
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
					<Alert icon={<IconInfoCircle size={16} />} title="Tips">
						Try not to include any personal information in your
						post. No phone numbers, serial numbers, email, or
						anything identifiable to bots. This includes what's in
						your photo.
					</Alert>
					<Button
						disabled={isFormValid(product)}
						onClick={submitPost}
						leftIcon={<IconSend size={14} />}
					>
						Submit
					</Button>
				</Stack>
			</Container>
		</>
	);
}
