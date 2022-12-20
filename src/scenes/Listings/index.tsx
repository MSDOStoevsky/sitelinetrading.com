import * as React from "react";
import { Center, Grid, MediaQuery, Pagination, Stack } from "@mantine/core";
import { ListingCard } from "../../components/ListingCard";
import { ListingToolbar } from "./ListingToolbar";
import { SearchExpression } from "../../api/SearchExpression";
import _ from "lodash";
import { searchAllProducts } from "../../api";
import { ApiPaginatedSearchResponse } from "../../api/ApiPaginatedSearchResponse";
import { Product } from "../../api/Product";

interface Props {
	searchEntry: string;
}
/**
 * Listings
 */
export function Listings(props: Props) {
	const [searchExpresison, setSearchExpression] =
		React.useState<SearchExpression>({
			page: 0,
			pageSize: 50,
			filterExpression: props.searchEntry
				? { title: props.searchEntry }
				: undefined,
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
			setListingData(data);
		});
	}, [searchExpresison]);

	React.useEffect(() => {
		setSearchExpression((oldSearchExpression) => ({
			...oldSearchExpression,
			filterExpression: props.searchEntry
				? {
						title: props.searchEntry,
						...oldSearchExpression.filterExpression,
				  }
				: undefined,
		}));
	}, [props.searchEntry]);

	return (
		<>
			<MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
				<ListingToolbar
					direction="row"
					p="xs"
					fixed={true}
					position={{ top: 0, left: 0 }}
					height={55}
					withBorder
					onFilterChange={(filterState) => {
						setSearchExpression((oldSearchExpression) => ({
							...oldSearchExpression,
							filterExpression: {
								...oldSearchExpression.filterExpression,
							},
						}));
					}}
					onSortChange={(sortState) => {
						setSearchExpression((oldSearchExpression) => ({
							...oldSearchExpression,
							orderBy: {
								field: sortState[0],
								order: sortState[1] as "ASC" | "DESC",
							},
						}));
					}}
				/>
			</MediaQuery>

			<ListingToolbar
				direction="column"
				p="xs"
				width={{ sm: 55 }}
				hiddenBreakpoint={"sm"}
				hidden
				onFilterChange={(filterState) => {}}
				onSortChange={(sortState) => {}}
			/>

			<Stack>
				<Grid>
					{_.map(listingData?.data, (listing) => {
						return (
							<Grid.Col sm={6} md={6} lg={3} key={listing._id}>
								<ListingCard {...listing} />
							</Grid.Col>
						);
					})}
				</Grid>

				{_.isEmpty(listingData?.data) && (
					<Center>That search didn't turn up any results</Center>
				)}

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
											page: page - 1,
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
