import * as React from "react";
import { Center, Grid, MediaQuery, Pagination, Stack } from "@mantine/core";
import { ListingCard } from "../../components/ListingCard";
import { ListingToolbar } from "./ListingToolbar";
import { SearchExpression, OrderExpression } from "../../api/SearchExpression";
import _ from "lodash";
import { searchAllProducts } from "../../api";
import { ApiPaginatedSearchResponse } from "../../api/ApiPaginatedSearchResponse";
import { Product } from "../../api/Product";
import { SearchEntry } from "../../App";
import { Helmet } from "react-helmet";
import { LoadingPage } from "../LoadingPage";
import { FlagModal } from "../../components/FlagModal";
import { getFlags } from "../../api/flagServlet";

const defaultOrderExpression: OrderExpression = {
	field: "createdTimestamp",
	order: "DESC",
};

interface Props {
	searchEntry: SearchEntry;
	myId: string | undefined;
}

/**
 * Listings
 */
export function Listings(props: Props) {
	const [searchExpression, setSearchExpression] =
		React.useState<SearchExpression>({
			page: 0,
			pageSize: 40,
			filterExpression: props.searchEntry
				? {
						title: props.searchEntry.text,
						state: props.searchEntry.state,
				  }
				: undefined,
			orderBy: defaultOrderExpression,
			select: "*",
		});
	const [listingData, setListingData] = React.useState<
		undefined | ApiPaginatedSearchResponse<Product>
	>(undefined);
	const [flags, setFlags] = React.useState<
		undefined | Array<{ productId: string }>
	>(undefined);
	const [productOpenForFlag, setProductOpenForFlag] = React.useState<string | undefined>(undefined);
	
	React.useEffect(() => {
		loadFlags();
	}, []);

	React.useEffect(() => {
		searchAllProducts(searchExpression).then((data) => {
			setListingData(data);
		});
	}, [searchExpression]);

	React.useEffect(() => {
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
	
	function loadFlags () {
		props.myId && getFlags(props.myId).then((data) => {
			console.log(data)
			setFlags(data.data);
		});
	}

	if (!listingData) {
		return <LoadingPage />;
	}
	return (
		<>
			<Helmet>
				<title>Siteline Trading | Search Products</title>
			</Helmet>
			<MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
				<ListingToolbar
					direction="row"
					p="xs"
					spacing="space-evenly"
					position={{ top: 0, left: 0 }}
					height={55}
					withBorder
					zIndex={100}
					filterExpression={searchExpression.filterExpression}
					onFilterChange={(filterState) => {
						setSearchExpression((oldSearchExpression) => ({
							...oldSearchExpression,
							filterExpression: filterState,
						}));
					}}
					onSortChange={(sortState) => {
						setSearchExpression((oldSearchExpression) => ({
							...oldSearchExpression,
							orderBy: sortState || defaultOrderExpression,
						}));
					}}
				/>
			</MediaQuery>

			<ListingToolbar
				direction="column"
				p="xs"
				width={{ sm: 55 }}
				hiddenBreakpoint={"md"}
				hidden
				zIndex={100}
				filterExpression={searchExpression.filterExpression}
				onFilterChange={(filterState) => {
					setSearchExpression((oldSearchExpression) => ({
						...oldSearchExpression,
						filterExpression: filterState,
					}));
				}}
				onSortChange={(sortState) => {
					setSearchExpression((oldSearchExpression) => ({
						...oldSearchExpression,
						orderBy: sortState || defaultOrderExpression,
					}));
				}}
			/>

			<Stack mt={{ base: "3rem", sm: "0" }}>
				<Grid>
					{_.map(listingData?.data, (listing) => {
						return (
							<Grid.Col sm={6} md={6} lg={3} key={listing.id}>
								<ListingCard 
									{...listing}
									myId={props.myId}
									onFlag={() => {
										setProductOpenForFlag(listing.id);
									}}
									isFlagged={!!_.find(flags, (flag) => flag.productId === listing.id)}
								/>
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
			<FlagModal
				userId={props.myId}
				productToFlag={productOpenForFlag}
				onAgree={() => {
					loadFlags();
					setProductOpenForFlag(undefined);
				}}
				onDisagree={() => setProductOpenForFlag(undefined)}
				onClose={() => setProductOpenForFlag(undefined)}
			/>
		</>
	);
}
