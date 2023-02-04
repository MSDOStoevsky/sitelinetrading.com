import * as React from "react";
import { Container } from "@mantine/core";
import _ from "lodash";
import { Feedback } from "./Feedback";
import { Listings } from "./Listings";
import { useParams } from "react-router-dom";
import { NoPage } from "../NoPage";
import { User } from "../../api/User";
import { Helmet } from "react-helmet";

interface Props {
	myId: string;
	displayName?: string;
}

export function User(props: Props) {
	const { id } = useParams();
	const [isFeedbackDrawerOpen, setIsFeedbackDrawerOpen] =
		React.useState(false);

	if (!id) {
		return <NoPage />;
	}

	return (
		<>
			<Helmet>
				<title>Siteline Trading | User {props.myId}</title>
			</Helmet>
			<Feedback
				myId={props.myId}
				id={id}
				isFeedbackDrawerOpen={isFeedbackDrawerOpen}
				closeFeedbackDrawer={() => setIsFeedbackDrawerOpen(false)}
			/>
			<Container size="xl" px="xs">
				<Listings
					myId={props.myId}
					id={id}
					openFeedbackDrawer={() => setIsFeedbackDrawerOpen(true)}
				/>
			</Container>
		</>
	);
}
