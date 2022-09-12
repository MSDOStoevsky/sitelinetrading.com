import * as React from "react";
import {
	Center,
	Stack,
	Image,
	TextInput,
	Title,
	Modal,
	Kbd,
	Button,
	Text,
} from "@mantine/core";
import styled from "@emotion/styled";
import _ from "lodash";
import { useClickOutside } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons";

interface Props {
	isOpen: boolean;
	searchEntry: string;
	onClose(): void;
	onSearch(value: string): void;
	onChange(value: string): void;
}

const SearchInput = styled(TextInput)``;

const SearchSuggestions = styled(Stack)`
	padding-top: 1rem;
`;

const SearchSuggestion = styled.div`
	display: flex;
	padding: 0.5rem 0.5rem;
	gap: 1rem;
	border-radius: 4px;

	:hover {
		background-color: #f8f9fa;
		cursor: pointer;
	}

	> img {
		width: 100%;
	}

	.search-suggestion-title {
		flex: 1;
	}
`;

export function SearchSheet(props: Props) {
	const [searchEntry, setSearchEntry] = React.useState("");
	const ref = useClickOutside(() => props.onClose());
	const navigate = useNavigate();

	React.useEffect(() => {
		props.onChange(searchEntry);
	}, [searchEntry]);

	return (
		<Modal
			opened={props.isOpen}
			onClose={() => {
				props.onClose();
			}}
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
			withFocusReturn={false}
			withCloseButton={false}
		>
			<TextInput
				placeholder="Search"
				// SAASAS
				icon={<IconSearch />}
				size={"xl"}
				value={searchEntry}
				onChange={(event) => {
					setSearchEntry(event.target.value);
				}}
				autoFocus={true}
				onKeyUp={(event) => {
					if (event.key === "Enter" && searchEntry) {
						navigate("listings");
						props.onSearch(searchEntry);
						props.onClose();
					}
				}}
			/>
			<SearchSuggestions>
				{_.isEmpty(searchEntry) && (
					// TODO: use search results state
					<Stack>
						<Text>
							Start typing to being your search, or select from
							these categories:
						</Text>

						<Button variant="subtle">Rifles</Button>
						<Button variant="subtle">Shotguns</Button>
						<Button variant="subtle">Handguns</Button>
					</Stack>
				)}
				{_.isEmpty(["a"]) && (
					// TODO: use search results state
					<Center>
						<Title order={2}>No Results Found</Title>
					</Center>
				)}
				{!_.isEmpty(props.searchEntry) &&
					_.map(dummyListings, (dummyListing) => {
						return (
							<>
								<SearchSuggestion
									onClick={() => {
										navigate(`listings/${dummyListing.id}`);
										props.onClose();
									}}
								>
									<Image
										radius="md"
										fit="contain"
										width={150}
										height={100}
										src=""
										alt="Random unsplash image"
										withPlaceholder
									/>
									<Center>
										<Title
											order={4}
											className="search-suggestion-title"
										>
											{dummyListing.title}
										</Title>
									</Center>
								</SearchSuggestion>
							</>
						);
					})}

				{!_.isEmpty(props.searchEntry) && (
					<Center>
						<Text>
							Or press <Kbd>Enter</Kbd> to search
						</Text>
					</Center>
				)}
			</SearchSuggestions>
		</Modal>
	);
}

const dummyListings = [
	{
		id: "123456",
		thumb: "",
		title: "Glock 19",
	},
	{
		id: "654321",
		thumb: "",
		title: "B&T TP9",
	},
];
