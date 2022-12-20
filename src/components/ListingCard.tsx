import * as React from "react";
import { Card, Image, Text, Badge, Group, Title } from "@mantine/core";
import { Product } from "../api/Product";
import { useNavigate } from "react-router-dom";

export function ListingCard(props: Product) {
	const navigate = useNavigate();
	return (
		<Card shadow="sm" p="lg" radius="md" withBorder>
			<Card.Section component="a">
				<Image
					src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
					height={160}
					alt={props.title}
					onClick={() => navigate(`listings/${props._id}`)}
				/>
			</Card.Section>

			<Group position="apart" mt="md" mb="xs">
				<Text
					weight={500}
					component="a"
					onClick={() => navigate(`listings/${props._id}`)}
				>
					{props.title}
				</Text>
				{props.openToTrade ? (
					<Badge color="pink" variant="light">
						open to trade
					</Badge>
				) : null}
			</Group>

			<Title order={3}>{props.value}</Title>
		</Card>
	);
}
