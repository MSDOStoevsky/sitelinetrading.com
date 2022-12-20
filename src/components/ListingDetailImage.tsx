import * as React from "react";
import { Image, Paper } from "@mantine/core";

interface Props {
	imageSrc: string;
}

export function ListingDetailImage(props: Props) {
	return (
		<Paper shadow="xs" radius="lg" p="xl" m="sm">
			<Image
				src={props.imageSrc}
				height={400}
				alt="Norway"
				withPlaceholder
			/>
		</Paper>
	);
}
