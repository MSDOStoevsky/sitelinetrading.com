import * as React from "react";
import { Card, Table } from "@mantine/core";

export function Cart() {
	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody></tbody>
			</Table>

			<Card>Title</Card>
		</div>
	);
}
