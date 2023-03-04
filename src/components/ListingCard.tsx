import * as React from "react";
import {
	Card,
	Image,
	Badge,
	Group,
	Title,
	Anchor,
	createStyles,
	ActionIcon,
} from "@mantine/core";
import { Product } from "../api/Product";
import { useNavigate } from "react-router-dom";
import { IconFlag, IconPencil, IconTrash } from "@tabler/icons";
import _ from "lodash";

const useStyles = createStyles(() => ({
	clickableSection: {
		cursor: "pointer",
	},
	priceLabel: {
		textOverflow: "ellipsis",
		overflow: "hidden",
	},
}));

export interface Props extends Product {
	myId?: string;
	isEditable?: boolean;
	onEdit?(): void;
	onDelete?(): void;
	onFlag?(): void;
	isFlagged?: boolean;
	expiresIn?: number;
}

export function ListingCard(props: Props) {
	const navigate = useNavigate();
	const { classes } = useStyles();

	return (
		<Card shadow="sm" p="lg" radius="md" withBorder>
			<Card.Section inheritPadding py="xs">
				<Group position={props.isEditable ? "apart" : undefined} noWrap>
					<Title weight={500} order={3}>
						{props.title}, {props.state || "N/A"}
					</Title>
					{props.isEditable ? (
						<Group position="right" noWrap>
							<ActionIcon
								size="lg"
								variant="filled"
								color="red"
								onClick={props.onDelete}
							>
								<IconTrash />
							</ActionIcon>
							<ActionIcon
								size="lg"
								variant="filled"
								color="blue"
								onClick={props.onEdit}
							>
								<IconPencil />
							</ActionIcon>
						</Group>
					) : null}
				</Group>
			</Card.Section>
			<Card.Section
				className={classes.clickableSection}
				component="a"
				onClick={() => navigate(`/listings/${props.id}`)}
			>
				<Image
					src={props.image}
					height={160}
					alt={props.title}
					withPlaceholder
				/>
			</Card.Section>
			<Card.Section inheritPadding py="xs">
				<Group position="apart" mb="xs">
					<Title order={3} className={classes.priceLabel}>
						${props.value}
					</Title>
					{props.openToTrade ? (
						<Badge color="pink" variant="light">
							open to trade
						</Badge>
					) : null}
					{ props.myId &&
						<Group position="right" noWrap>
							<ActionIcon
								size="lg"
								variant="subtle"
								onClick={props.onFlag}
								disabled={props.isFlagged}
								title={props.isFlagged ? "You've already flagged this" : "Flag this post as abusive"}
							>
								<IconFlag />
							</ActionIcon>
						</Group>
					}
				</Group>
				<Group position="apart">
					<Anchor onClick={() => navigate(`/users/${props.userId}`)}>
						User: {props.displayName || props.userId}
					</Anchor>
					{props.expiresIn ? (
						<div>Expires in {_.floor(props.expiresIn)} days</div>
					) : null}
				</Group>
			</Card.Section>
		</Card>
	);
}
