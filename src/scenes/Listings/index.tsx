import * as React from "react";
import { Center, Grid, MediaQuery, Pagination, Stack } from "@mantine/core";
import { ListingCard } from "../../components/ListingCard";
import { ListingToolbar } from "./ListingToolbar";
import { SearchExpression } from "../../api/SearchExpression";
import _ from "lodash";
import { searchAllProducts } from "../../api";
import { ApiPaginatedSearchResponse } from "../../api/ApiPaginatedSearchResponse";
import { Product } from "../../api/Product";
import { SearchEntry } from "../../App";

interface Props {
	searchEntry: SearchEntry;
}
/**
 * Listings
 */
export function Listings(props: Props) {
	const [searchExpression, setSearchExpression] =
		React.useState<SearchExpression>({
			page: 0,
			pageSize: 50,
			filterExpression: props.searchEntry
				? {
						title: props.searchEntry.text,
						state: props.searchEntry.state,
				  }
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
		searchAllProducts(searchExpression).then((data) => {
			setListingData(data);
		});
	}, [searchExpression]);

	React.useEffect(() => {
		console.log(props.searchEntry);
		setSearchExpression((oldSearchExpression) => ({
			...oldSearchExpression,
			filterExpression: props.searchEntry
				? {
						...oldSearchExpression.filterExpression,
						title: props.searchEntry.text,
						state: props.searchEntry.state,
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
					position={{ top: 0, left: 0 }}
					height={55}
					withBorder
					zIndex={100}
					filterExpression={searchExpression.filterExpression}
					onFilterChange={(filterState) => {
						setSearchExpression((oldSearchExpression) => ({
							...oldSearchExpression,
							filterExpression: {
								...oldSearchExpression.filterExpression,
								...filterState,
							},
						}));
					}}
					onSortChange={(sortState) => {
						setSearchExpression((oldSearchExpression) => ({
							...oldSearchExpression,
							orderBy: sortState,
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
				zIndex={100}
				filterExpression={searchExpression.filterExpression}
				onFilterChange={(filterState) => {
					setSearchExpression((oldSearchExpression) => ({
						...oldSearchExpression,
						filterExpression: {
							...oldSearchExpression.filterExpression,
							...filterState,
						},
					}));
				}}
				onSortChange={(sortState) => {
					setSearchExpression((oldSearchExpression) => ({
						...oldSearchExpression,
						orderBy: sortState,
					}));
				}}
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

				{_.isEmpty(listingData?.data) && <Center>No results</Center>}

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
