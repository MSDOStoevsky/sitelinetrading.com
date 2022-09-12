import * as React from "react";
import { Image, Paper } from "@mantine/core";

export function ListingDetailImage() {
	return (
		<Paper shadow="xs" radius="lg" p="xl" m="sm">
			<Image
				src="https://s.yimg.com/aah/airgundepot/glock-19-1.gif"
				height={400}
				alt="Norway"
			/>
		</Paper>
	);
}
