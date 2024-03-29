import * as React from "react";
import {
	Container,
	Stack,
	Text,
	Title,
	List,
} from "@mantine/core";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";

const ReleaseEntry = styled(Stack)`
	.mantine-Modal-title {
		margin-right: 9px;
		flex: 1;
	}
`;

export function News() {
	return (
		<>
			<Helmet>
				<title>Siteline Trading | News</title>
			</Helmet>
			<Container size="xs" px="xs">
				<Stack>
					<ReleaseEntry>
						<Title order={2}>3.03.2023</Title>
						<Text>
							Latest update is bringing a rudimentary spam flag. This will be verified manually
							to avoid any targeted removals of posts, things like that.
						</Text>
					</ReleaseEntry>
					<ReleaseEntry>
						<Title order={2}>1.14.2023</Title>
						<Text>
							Brief update... I will be using an image hosting
							application that is definitely not my first choice.
							I'd encourage you to check them out, notably their{" "}
							<a href="https://cloudinary.com/privacy">
								privacy policy
							</a>
							, and then make an informed decision about how you
							post your images on this site. I have every
							intention of hosting images myself, but that will
							take more time, and I would like this platform
							avaialble sooner than later considering all the
							events unfolding this year.
						</Text>
					</ReleaseEntry>
					<ReleaseEntry>
						<Title order={2}>1.7.2023</Title>
						<Text>
							Hi, everyone! Thanks for joining me in this project.
							This is going to be a pretty rough alpha and I hope
							you can all forgive the rough edges, as I can
							guarantee the support will be continuous so long as
							this sees use. I intend to stick to a few principles
							while maintaining this app that I hope are a
							significant improvement over the poor practices I
							see in other applications:
						</Text>
						<List>
							<List.Item>
								I will do nothing to sacrifice user privacy. I
								do not store payment, location, or browsing
								habits. (Note, though, I must store your login
								session for practical reasons).
							</List.Item>
							<List.Item>
								I have no plans to collect subscription fees (I
								will be begging for donation money, however).
							</List.Item>
							<List.Item>
								All code for the backend and frontend will be
								open source. Please feel free to contribute
								changes and criticisms via GitHub.
							</List.Item>
							<List.Item>
								I will maintain a policy of over-transparency. I
								will tell you what I plan to do; I will tell you
								what I don't plan to do.
							</List.Item>
						</List>
					</ReleaseEntry>
				</Stack>
			</Container>
		</>
	);
}
