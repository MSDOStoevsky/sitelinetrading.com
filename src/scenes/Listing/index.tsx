import * as React from "react";
import styled from "@emotion/styled";
import {
	Title,
	Text,
	Grid,
	Button,
	Stack,
	Badge,
	Group,
	Paper,
	Anchor,
} from "@mantine/core";
import { ListingDetailImage } from "../../components/ListingDetailImage";
import { Product } from "../../api/Product";
import { getSingleProduct } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { IconSend } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import { LoadingPage } from "../LoadingPage";
import { NoPage } from "../NoPage";

const Wrapper = styled.div`
	min-width: 10rem;
	height: 100%;
`;

interface Props {
	myId: string | undefined;
}

export function Listing(props: Props) {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = React.useState<boolean>(
		false
	);
	const [listingData, setListingData] = React.useState<undefined | Product>(
		undefined
	);

	React.useEffect(() => {
		setIsLoading(true);
		getSingleProduct(id || "").then((data) => {
			setListingData(data?.data);
		}).finally(() => {
			setIsLoading(false);
		});
	}, [id]);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!listingData) {
		return <NoPage />
	}

	return (
		<Wrapper>
			<Helmet>
				<title>Siteline Trading | {listingData?.title || "Not Found"}</title>
			</Helmet>
			<Grid grow gutter="xl">
				<Grid.Col sm={12} lg={6}>
					<ListingDetailImage
						imageSrc={listingData?.image}
						title={listingData?.title}
					/>
				</Grid.Col>
				<Grid.Col sm={12} lg={6}>
					<Paper shadow="xs" radius="lg" p="xl" m="sm">
						<Stack sx={{ wordBreak: "break-all" }}>
							<Title order={1}>{listingData?.title}</Title>
							<Title order={6}>
								<Anchor
									inherit
									onClick={() => {
										navigate(
											`/users/${listingData?.userId}`
										);
									}}
								>
									User:{" "}
									{listingData?.displayName ||
										listingData?.userId}
									{", "}
									{listingData?.state}
								</Anchor>
							</Title>
							<Title order={6}>
								Last updated{" "}
								{new Intl.DateTimeFormat("en-US", {
									dateStyle: "long",
									timeStyle: "short",
								}).format(
									listingData?.updatedTimestamp || Date.now()
								)}
							</Title>

							<Group mb="xs">
								<Title order={2}>${listingData?.value}</Title>

								{listingData?.openToTrade ? (
									<Badge
										color="pink"
										variant="light"
										title="User has indicated that they are open to trades"
									>
										open to trade
									</Badge>
								) : null}
							</Group>

							<Text>{listingData?.description}</Text>

							<Group mb="xs">
								<Button
									onClick={() => {
										if (
											props.myId &&
											props.myId === listingData?.userId
										) {
											showNotification({
												message:
													"You can't do that, this is you",
												color: "red",
											});
										} else {
											navigate(
												`/account/message-center/${listingData?.userId}?ref=${listingData?.id}`
											);
										}
									}}
									rightIcon={<IconSend size={14} />}
									title="Message the seller through the message center"
								>
									Contact Seller
								</Button>
							</Group>
						</Stack>
					</Paper>
				</Grid.Col>
			</Grid>
		</Wrapper>
	);
}
