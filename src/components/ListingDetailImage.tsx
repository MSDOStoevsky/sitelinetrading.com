import * as React from "react";
import { Image, Paper } from "@mantine/core";

interface Props {
	imageSrc: string;
	title: string | undefined;
}

export function ListingDetailImage(props: Props) {
	return (
		<Paper shadow="xs" radius="lg" p="xl" m="sm">
			<Image
				src={props.imageSrc}
				alt={props.title}
				height={!props.imageSrc ? "400px" : undefined}
				withPlaceholder
			/>
		</Paper>
	);
}
