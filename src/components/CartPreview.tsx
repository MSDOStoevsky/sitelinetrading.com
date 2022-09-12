import * as React from "react";
import { Button, Drawer } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props {
	isOpen: boolean;
	onClose(): void;
}
export function CartPreview(props: Props) {
	const navigate = useNavigate();

	return (
		<Drawer
			position="right"
			opened={props.isOpen}
			onClose={props.onClose}
			padding="sm"
		>
			<Button variant="subtle" onClick={() => navigate("/cart")}>
				Cart
			</Button>
			<Button variant="filled">Checkout</Button>
		</Drawer>
	);
}
