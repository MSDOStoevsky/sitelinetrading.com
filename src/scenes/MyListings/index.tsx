import * as React from "react";
import {
	ActionIcon,
	Center,
	Grid,
	MediaQuery,
	Pagination,
	Stack,
} from "@mantine/core";
import { ListingCard } from "../../components/ListingCard";
import { SearchExpression } from "../../api/SearchExpression";
import _ from "lodash";
import { searchAllProducts } from "../../api";
import { ApiPaginatedSearchResponse } from "../../api/ApiPaginatedSearchResponse";
import { Product } from "../../api/Product";
import { IconPencil } from "@tabler/icons";
import { Link } from "react-router-dom";
import { BaseProps } from "../../utils/BaseProps";

/**
 * Listings
 */
export function MyListings(props: BaseProps) {
	const [searchExpresison, setSearchExpression] =
		React.useState<SearchExpression>({
			page: 0,
			pageSize: 50,
			filterExpression: { userId: props.userId },
			orderBy: {
				field: "addedTimestamp",
				order: "DESC",
			},
			select: "*",
		});
	const [listingData, setListingData] = React.useState<
		undefined | ApiPaginatedSearchResponse<Product>
	>(undefined);

	React.useEffect(() => {
		searchAllProducts(searchExpresison).then((data) => {
			console.log(data);
			setListingData(data);
		});
	}, [searchExpresison]);

	return (
		<>
			<Stack>
				<Grid>
					{_.map(listingData?.data, (listing) => {
						return (
							<Grid.Col sm={6} md={6} lg={3}>
								<ListingCard {...listing} />
							</Grid.Col>
						);
					})}
				</Grid>

				{_.isEmpty(listingData?.data) && (
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
				)}

				{!_.isEmpty(listingData?.data) && (
					<Center>
						<Pagination
							page={listingData?.pageInfo.currentPage}
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
		</>
	);
}
