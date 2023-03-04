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
	ActionIcon,
} from "@mantine/core";
import { ListingDetailImage } from "../../components/ListingDetailImage";
import { Product } from "../../api/Product";
import { getSingleProduct } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { IconFlag, IconSend } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import { LoadingPage } from "../LoadingPage";
import { NoPage } from "../NoPage";
import { FlagModal } from "../../components/FlagModal";
import { getFlags } from "../../api/flagServlet";

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
	const [productOpenForFlag, setProductOpenForFlag] = React.useState<string | undefined>(undefined);
	const [flags, setFlags] = React.useState<
		undefined | Array<{ productId: string }>
	>(undefined);

	React.useEffect(() => {
		loadFlags();
	}, []);

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

	function loadFlags () {
		props.myId && getFlags(props.myId).then((data) => {
			console.log(data)
			setFlags(data.data);
		});
	}

	return (
		<Wrapper>
			<Helmet>
				<title>Siteline Trading | {listingData?.title || id}</title>
        		<meta name="description" content={listingData?.description}/>
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
								{ props.myId && (
									<ActionIcon
										size="lg"
										variant="subtle"
										onClick={() => {
											setProductOpenForFlag(listingData?.id);
										}}
									>
										<IconFlag />
									</ActionIcon>
								)}
							</Group>
						</Stack>
					</Paper>
				</Grid.Col>
			</Grid>
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
		</Wrapper>
	);
}
