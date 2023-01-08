import * as React from "react";
import {
	ActionIcon,
	Center,
	Grid,
	Pagination,
	Skeleton,
	Stack,
} from "@mantine/core";
import { ListingCard } from "../../components/ListingCard";
import { SearchExpression } from "../../api/SearchExpression";
import _ from "lodash";
import { deleteProduct, searchAllProducts } from "../../api";
import { ApiPaginatedSearchResponse } from "../../api/ApiPaginatedSearchResponse";
import { Product } from "../../api/Product";
import { IconPencil } from "@tabler/icons";
import { Link } from "react-router-dom";
import { BaseProps } from "../../utils/BaseProps";
import { EditListingModal } from "./EditListingModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { showNotification } from "@mantine/notifications";

interface Props extends BaseProps {
	myId: string;
}

/**
 * Listings
 */
export function MyListings(props: Props) {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [confirmDeleteId, setConfirmDeleteId] = React.useState<
		string | undefined
	>(undefined);
	const [listingDetails, setListingDetails] = React.useState<
		Product | undefined
	>(undefined);
	const [searchExpresison, setSearchExpression] = React.useState<
		SearchExpression | undefined
	>(undefined);
	const [listingData, setListingData] = React.useState<
		undefined | ApiPaginatedSearchResponse<Product>
	>(undefined);

	React.useEffect(() => {
		loadProducts();
	}, [searchExpresison]);

	React.useEffect(() => {
		if (!props.myId) {
			return;
		}
		setSearchExpression({
			page: 0,
			pageSize: 50,
			filterExpression: { userId: props.myId },
			orderBy: {
				field: "addedTimestamp",
				order: "DESC",
			},
			select: "*",
		});
	}, [props.myId]);

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

	return (
		<>
			<Stack>
				<Skeleton visible={isLoading}>
					<Grid>
						{_.map(listingData?.data, (listing) => {
							return (
								<Grid.Col
									sm={6}
									md={6}
									lg={3}
									key={listing._id}
								>
									<ListingCard
										{...listing}
										isEditable={true}
										onEdit={() =>
											setListingDetails(listing)
										}
										onDelete={() =>
											setConfirmDeleteId(listing._id)
										}
									/>
								</Grid.Col>
							);
						})}
					</Grid>
				</Skeleton>

				{listingData !== undefined && _.isEmpty(listingData?.data) ? (
					<Center>
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
					</Center>
				) : null}

				{!_.isEmpty(listingData?.data) && (
					<Center>
						<Pagination
							page={listingData?.pageInfo.currentPage}
							onChange={(page) => {
								setSearchExpression(
									(curentSearchExpression) => {
										if (!curentSearchExpression) {
											return;
										}
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
