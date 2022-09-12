import * as React from "react";
import _ from "lodash";
import { Card, Group, Text, Stack, Image, Title } from "@mantine/core";

/**
 * Order history view
 */
export function OrderHistory() {
	const [orderSummaries, setOrderSummaries] = React.useState([
		{
			id: "12345XFZ",
			total: 199.25,
			timestamp: Date.now(),
			status: "Shipped",
			orderContent: [
				{
					id: "TTPP1234",
					name: "Test gun 19",
					thumb: "https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				},
				{
					id: "SVT91205",
					name: "Fooboo 556",
					thumb: "https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				},
			],
		},
		{
			id: "800BBY567",
			total: 20.5,
			timestamp: Date.now(),
			status: "Delivered",
			orderContent: [
				{
					id: "GH4PDJ2",
					name: "SCAR 20-S",
					thumb: "https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
				},
			],
		},
	]);

	return (
		<Stack>
			{_.map(orderSummaries, (orderSummary) => {
				return (
					<Card withBorder shadow="sm" radius="md">
						<Card.Section withBorder inheritPadding py="xs">
							<Group position="apart">
								<Text weight={500}>
									Order {orderSummary.id}
								</Text>
								<Text weight={500}>
									Total {orderSummary.total}
								</Text>
								<Text weight={500}>
									Timestamp {orderSummary.timestamp}
								</Text>
							</Group>
						</Card.Section>
						<Card.Section inheritPadding py="xs">
							<Stack>
								<Title order={3}>{orderSummary.status}</Title>
								{_.map(
									orderSummary.orderContent,
									(orderContentItem) => {
										return (
											<Group key={orderContentItem.id}>
												<Image
													width={200}
													src={orderContentItem.thumb}
													radius="sm"
												/>
												<Text>
													{orderContentItem.name}
												</Text>
											</Group>
										);
									}
								)}
							</Stack>
						</Card.Section>
					</Card>
				);
			})}
		</Stack>
	);
}
