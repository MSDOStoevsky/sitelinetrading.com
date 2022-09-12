import * as React from "react";
import { TextInput } from "@mantine/core";

interface Props {
	onSubmit(value: string): void;
}

export function ProductSearch(props: Props) {
	return (
		<TextInput
			placeholder="Search"
			onSubmit={(event) => {
				props.onSubmit(event.currentTarget.value);
			}}
		/>
	);
}
