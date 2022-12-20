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
	Skeleton,
	Select,
} from "@mantine/core";
import styled from "@emotion/styled";
import _ from "lodash";
import { useClickOutside } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons";
import { ApiPaginatedSearchResponse } from "../api/ApiPaginatedSearchResponse";
import { searchAllProducts } from "../api";
import { Product } from "../api/Product";

interface Props {
	isOpen: boolean;
	searchEntry: string;
	onClose(): void;
	onSearch(value: string): void;
	onChange(value: string): void;
}

const StyledModal = styled(Modal)`
	.mantine-Modal-title {
		margin-right: 9px;
		flex: 1;
	}
`;

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

const Search = styled.div`
	display: flex;
	flex-direction: row;

	.Input {
		flex: 4;

		input {
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}
	}

	.State {
		flex: 1;

		input {
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
	}
`;

export function SearchSheet(props: Props) {
	const [searchEntry, setSearchEntry] = React.useState("");
	const [listingSuggestions, setListingSuggestions] = React.useState<
		ApiPaginatedSearchResponse<Product> | undefined
	>(undefined);

	React.useEffect(() => {
		searchAllProducts({
			filterExpression: searchEntry ? { title: searchEntry } : undefined,
			orderBy: {
				field: "title",
				order: "DESC",
			},
			page: 0,
			pageSize: 10,
			select: "*",
		}).then((data) => {
			setListingSuggestions(data);
		});
	}, [searchEntry]);

	const ref = useClickOutside(() => props.onClose());
	const navigate = useNavigate();

	React.useEffect(() => {
		props.onChange(searchEntry);
	}, [searchEntry]);

	const renderSearchSuggestions = () => {
		if (!listingSuggestions) {
			return (
				<Center>
					<Stack>
						<Text>Nothing to suggest</Text>
					</Stack>
				</Center>
			);
		} else {
			return _.map(listingSuggestions.data, (listing) => {
				return (
					<SearchSuggestion
						key={listing._id}
						onClick={() => {
							navigate(`listings/${listing._id}`);
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
								{listing.title}
							</Title>
						</Center>
					</SearchSuggestion>
				);
			});
		}
	};

	return (
		<StyledModal
			size={"xl"}
			opened={props.isOpen}
			onClose={() => {
				props.onClose();
			}}
			overlayOpacity={0.6}
			overlayColor="#000"
			overlayBlur={2}
			withFocusReturn={false}
			withCloseButton={false}
			overflow="inside"
			title={
				<Search>
					<TextInput
						className="Input"
						placeholder="Search"
						icon={<IconSearch />}
						size={"xl"}
						value={searchEntry}
						onChange={(event) => {
							setSearchEntry(event.target.value);
						}}
						autoFocus={true}
						onKeyUp={(event) => {
							if (event.key === "Enter") {
								navigate("");
								props.onSearch(searchEntry);
								props.onClose();
							}
						}}
					/>
					<Select
						className="State"
						size={"xl"}
						placeholder="State"
						data={["MI", "CA", "VT", "ME"]}
					/>
				</Search>
			}
		>
			<SearchSuggestions>{renderSearchSuggestions()}</SearchSuggestions>
		</StyledModal>
	);
}
