import * as React from "react";
import {
	Modal,
	Button,
	TextInput,
	Text,
	Stack,
	Switch,
	SimpleGrid,
	Textarea,
	Image,
	NativeSelect,
	NumberInput,
} from "@mantine/core";
import _ from "lodash";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Product } from "../../api/Product";
import { updateProduct } from "../../api";
import { showNotification } from "@mantine/notifications";
import { IconCurrencyDollar } from "@tabler/icons";
import { STATE_ABBREVIATIONS } from "../../utils/constants";
import FormData from "form-data";

interface Props {
	listingDetails: Product | undefined;
	onClose(): void;
	onSubmit(): void;
}

/**
 *
 */
export function EditListingModal(props: Props) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [files, setFiles] = React.useState<FileWithPath[]>([]);
	const [product, setProduct] = React.useState<Partial<Product>>({
		title: "",
		description: "",
		state: "",
		value: undefined,
		openToTrade: true,
	});

	React.useEffect(() => {
		if (props.listingDetails) {
			setProduct(
				_.pick(props.listingDetails, [
					"userId",
					"title",
					"description",
					"state",
					"value",
					"openToTrade",
				])
			);
		}
	}, [props.listingDetails]);

	async function submit() {
		if (!props.listingDetails) {
			return;
		}
		setIsLoading(true);
		try {
			const formData = new FormData();
			if (!_.isEmpty(files)) {
				const fileName = _.kebabCase(_.deburr(_.trim(product.title)));
				formData.append("file", files[0], fileName);
			}
			formData.append("data", JSON.stringify(product));
			await updateProduct(props.listingDetails.id!, formData);

			showNotification({
				title: "Success",
				message: "Edit successful",
				color: "green",
			});
		} catch (error) {
			showNotification({
				title: "Error",
				message: "There was an issue making these changes",
				color: "red",
			});
		} finally {
			setIsLoading(false);
			props.onClose();
			props.onSubmit();
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
		<Modal
			opened={!!props.listingDetails}
			onClose={props.onClose}
			title="Edit"
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
		>
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

				<NumberInput
					placeholder="Value"
					label="Value"
					icon={<IconCurrencyDollar size={16} />}
					withAsterisk
					value={product.value}
					onChange={(value) =>
						setProduct((product) => ({
							...product,
							value: value,
						}))
					}
					min={0}
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

				<Button fullWidth onClick={() => submit()} loading={isLoading}>
					Submit
				</Button>
			</Stack>
		</Modal>
	);
}
