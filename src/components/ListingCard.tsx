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
import { IconPencil, IconTrash } from "@tabler/icons";

const useStyles = createStyles(() => ({
	clickableSection: {
		cursor: "pointer",
	},
}));

export interface Props extends Product {
	isEditable?: boolean;
	onEdit?(): void;
	onDelete?(): void;
}

export function ListingCard(props: Props) {
	const navigate = useNavigate();
	const { classes } = useStyles();

	return (
		<Card shadow="sm" p="lg" radius="md" withBorder>
			<Card.Section inheritPadding py="xs">
				<Group position={props.isEditable ? "apart" : undefined} noWrap>
					<Title weight={500} order={3}>
						{props.title}
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
				onClick={() => navigate(`/listings/${props._id}`)}
			>
				<Image
					src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
					height={160}
					alt={props.title}
				/>
			</Card.Section>
			<Card.Section inheritPadding py="xs">
				<Group position="apart" mb="xs">
					<Title order={3}>${props.value}</Title>
					{props.openToTrade ? (
						<Badge color="pink" variant="light">
							open to trade
						</Badge>
					) : null}
				</Group>
				<Anchor onClick={() => navigate(`/users/${props.userId}`)}>
					{props.displayName || props.userId} {props.state}
				</Anchor>
			</Card.Section>
		</Card>
	);
}
