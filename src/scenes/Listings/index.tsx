import * as React from "react";
import { Center, Grid, MediaQuery, Pagination, Stack } from "@mantine/core";
import { ListingCard } from "../../components/ListingCard";
import { ListingToolbar } from "./ListingToolbar";

/**
 * Listings
 */
export function Listings() {
	const [listingData, setListingData] = React.useState({
		listings: [],
		pageData: {
			page: 0,
			totalItemsPerPage: 25,
			totalPages: 10,
		},
	});
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
				/>
			</MediaQuery>

			<ListingToolbar
				direction="column"
				p="xs"
				width={{ sm: 55 }}
				hiddenBreakpoint={"sm"}
				hidden
			/>

			<Stack>
				<Grid>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
					<Grid.Col sm={6} md={6} lg={3}>
						<ListingCard />
					</Grid.Col>
				</Grid>
				<Center>
					<Pagination
						page={listingData.pageData.page}
						onChange={(page) => {
							setListingData((currentListingData) => {
								return {
									...currentListingData,
									pageData: {
										...currentListingData.pageData,
										page: page,
									},
								};
							});
						}}
						total={listingData.pageData.totalPages}
					/>
				</Center>
			</Stack>
		</>
	);
}
