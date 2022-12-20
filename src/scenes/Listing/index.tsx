import * as React from "react";
import styled from "@emotion/styled";
import { Title, Text, Grid, Button, Stack, Space, Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { ListingDetailImage } from "../../components/ListingDetailImage";
import { Product } from "../../api/Product";
import { getSingleProduct } from "../../api";
import { RouteProps, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { IconSend, IconSpace } from "@tabler/icons";

const Wrapper = styled.div`
	min-width: 10rem;
	height: 100%;
`;

const AddToCartWrapper = styled.div`
	display: flex;
	gap: 1rem;
`;

export function Listing() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [listingData, setListingData] = React.useState<undefined | Product>(
		undefined
	);

	React.useEffect(() => {
		getSingleProduct(id || "").then((data) => {
			setListingData(data?.data);
		});
	}, [id]);

	return (
		<Wrapper>
			<Grid justify="space-between">
				<Grid.Col sm={12} lg={6}>
					<ListingDetailImage imageSrc={listingData?.image} />
				</Grid.Col>
				<Grid.Col sm={12} lg={6}>
					<Stack>
						<Title order={1}>{listingData?.title}</Title>
						<Text inline>
							Value: {listingData?.value}{" "}
							{listingData?.openToTrade ? (
								<Badge color="pink" variant="light">
									open to trade
								</Badge>
							) : null}
						</Text>

						<Text>{listingData?.description}</Text>
						<AddToCartWrapper>
							<Button
								onClick={() =>
									navigate(
										`/account/message-center/?user=${listingData?.userId}&ref=${listingData?._id}`
									)
								}
								rightIcon={<IconSend size={14} />}
							>
								Contact Seller
							</Button>
						</AddToCartWrapper>
					</Stack>
				</Grid.Col>
			</Grid>
			<Space h="xl" />
		</Wrapper>
	);
}
