import * as React from "react";
import {
	ActionIcon,
	Center,
	Grid,
	Pagination,
	Skeleton,
	Stack,
	createStyles,
	TextInput,
	MediaQuery,
} from "@mantine/core";
import { ListingCard } from "../../components/ListingCard";
import { SearchExpression } from "../../api/SearchExpression";
import _ from "lodash";
import { deleteProduct, searchAllProducts } from "../../api";
import { ApiPaginatedSearchResponse } from "../../api/ApiPaginatedSearchResponse";
import { Product } from "../../api/Product";
import { IconLayoutSidebar, IconPencil } from "@tabler/icons";
import { Link } from "react-router-dom";
import { BaseProps } from "../../utils/BaseProps";
import { EditListingModal } from "./EditListingModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { showNotification } from "@mantine/notifications";
import { DateTime } from "luxon";
import { InputButtonPair } from "../../components/InputButtonPair";

interface Props extends BaseProps {
	myId: string;
	id: string;
	openFeedbackDrawer(): void;
}
const useStyles = createStyles((theme, _params, getRef) => ({
	sendButton: {
		height: "auto",
	},
}));

/**
 * Listings
 */
export function Listings(props: Props) {
	const { classes } = useStyles();
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [confirmDeleteId, setConfirmDeleteId] = React.useState<
		string | undefined
	>(undefined);
	const [listingDetails, setListingDetails] = React.useState<
		Product | undefined
	>(undefined);
	const [listingData, setListingData] = React.useState<
		undefined | ApiPaginatedSearchResponse<Product>
	>(undefined);
	const [searchExpresison, setSearchExpression] =
		React.useState<SearchExpression>({
			page: 0,
			pageSize: 8,
			filterExpression: { userId: props.id, title: "" },
			orderBy: {
				field: "createdTimestamp",
				order: "DESC",
			},
			select: "*",
		});

	const isThisMe = props.myId === props.id;

	React.useEffect(() => {
		loadProducts();
	}, [searchExpresison]);

	React.useEffect(() => {
		setSearchExpression((previousSearchExpression) => ({
			...previousSearchExpression,
			filterExpression: {
				...previousSearchExpression?.filterExpression,
				userId: props.id,
			},
		}));
	}, [props.id]);

	function loadProducts() {
		if (!searchExpresison) {
			return;
		}
		searchAllProducts(searchExpresison)
			.then((data) => {
				setListingData(data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	async function attemptDeleteProduct(id: string) {
		try {
			await deleteProduct(id);
			showNotification({
				title: "Success",
				message: "Listing removed",
				color: "green",
			});
		} catch (error) {
			showNotification({
				title: "Error",
				message: "There was an issue trying to delete the listing",
				color: "red",
			});
		} finally {
			setConfirmDeleteId(undefined);
			loadProducts();
		}
	}

	function renderNoListingMessage(isThisMe: boolean) {
		return (
			<Center>
				{isThisMe ? (
					<>
						You haven't made any listings. Click
						<ActionIcon
							component={Link}
							to="/post/"
							size="lg"
							title="make a listing"
							variant="subtle"
						>
							<IconPencil />
						</ActionIcon>{" "}
						to make one
					</>
				) : (
					<>User has no listings</>
				)}
			</Center>
		);
	}
	return (
		<>
			<Stack>
				<InputButtonPair>
					<MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
						<ActionIcon
							className={classes.sendButton}
							color="blue"
							title="Send"
							size="xl"
							variant="filled"
							onClick={() => props.openFeedbackDrawer()}
						>
							<IconLayoutSidebar />
						</ActionIcon>
					</MediaQuery>
					<TextInput
						size="lg"
						className="ReplyForm"
						placeholder="Filter"
						value={
							searchExpresison?.filterExpression!.title as string
						}
						onChange={(event) =>
							setSearchExpression((previousSearchExpression) => ({
								...previousSearchExpression,
								filterExpression: {
									...previousSearchExpression?.filterExpression,
									title: event.target.value,
								},
							}))
						}
					/>
				</InputButtonPair>
				<Skeleton visible={isLoading}>
					<Grid>
						{_.map(listingData?.data, (listing) => {
							const expiresInDays = DateTime.fromMillis(
								listing.createdTimestamp
							)
								.plus({ days: 30 })
								.diffNow("days").days;

							return (
								<Grid.Col
									sm={6}
									md={6}
									lg={3}
									key={listing._id}
								>
									<ListingCard
										{...listing}
										isEditable={isThisMe}
										onEdit={() =>
											setListingDetails(listing)
										}
										onDelete={() =>
											setConfirmDeleteId(listing._id)
										}
										expiresIn={expiresInDays}
									/>
								</Grid.Col>
							);
						})}
					</Grid>
				</Skeleton>

				{listingData !== undefined && _.isEmpty(listingData?.data)
					? renderNoListingMessage(isThisMe)
					: null}

				{!_.isEmpty(listingData?.data) && (
					<Center>
						<Pagination
							page={
								listingData
									? listingData.pageInfo.currentPage + 1
									: undefined
							}
							onChange={(page) => {
								setSearchExpression(
									(curentSearchExpression) => {
										return {
											...curentSearchExpression,
											page: page,
										};
									}
								);
							}}
							total={listingData?.pageInfo.totalPages || 0}
						/>
					</Center>
				)}
			</Stack>
			<ConfirmDeleteModal
				isOpen={!!confirmDeleteId}
				onClose={() => setConfirmDeleteId(undefined)}
				onAgree={() => {
					attemptDeleteProduct(confirmDeleteId!);
				}}
				onDisagree={() => {
					setConfirmDeleteId(undefined);
				}}
			/>
			<EditListingModal
				listingDetails={listingDetails}
				onClose={() => setListingDetails(undefined)}
				onSubmit={() => loadProducts()}
			/>
		</>
	);
}
