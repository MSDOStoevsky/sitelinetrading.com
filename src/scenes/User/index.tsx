import * as React from "react";
import { Container } from "@mantine/core";
import _ from "lodash";
import { Feedback } from "./Feedback";
import { Listings } from "./Listings";
import { useParams } from "react-router-dom";
import { NoPage } from "../NoPage";
import { User } from "../../api/User";

interface Props {
	myId: string;
	displayName?: string;
}

export function User(props: Props) {
	const { id } = useParams();

	if (!id) {
		return <NoPage />;
	}

	return (
		<>
			<Feedback myId={props.myId} id={id} />
			<Container size="xl" px="xs">
				<Listings myId={props.myId} id={id} />
			</Container>
		</>
	);
}
