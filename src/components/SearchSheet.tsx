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
	ScrollArea,
	Loader,
} from "@mantine/core";
import styled from "@emotion/styled";
import _ from "lodash";
import { useClickOutside } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons";
import { ApiPaginatedSearchResponse } from "../api/ApiPaginatedSearchResponse";
import { searchAllProducts } from "../api";
import { Product } from "../api/Product";
import { STATE_ABBREVIATIONS } from "../utils/constants";
import { SearchEntry } from "../App";
import { LoadingPage } from "../scenes/LoadingPage";
import { Search } from "../utils/commonStyles";

interface Props {
	isOpen: boolean;
	searchEntry: SearchEntry;
	onClose(): void;
	onSearch(value: SearchEntry): void;
	onChange(value: SearchEntry): void;
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

export function SearchSheet(props: Props) {
	const [text, setText] = React.useState(props.searchEntry.text);
	const [state, setState] = React.useState<string>(props.searchEntry.state);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [listingSuggestions, setListingSuggestions] = React.useState<
		ApiPaginatedSearchResponse<Product> | undefined
	>(undefined);

	React.useEffect(() => {
		setIsLoading(true);
		searchAllProducts({
			filterExpression: { title: text, state: state },
			orderBy: {
				field: "title",
				order: "DESC",
			},
			page: 0,
			pageSize: 10,
			select: "*",
		})
			.then((data) => {
				setListingSuggestions(data);
			})
			.finally(() => setIsLoading(false));
		props.onChange({ text, state });
	}, [text, state]);

	const ref = useClickOutside(() => props.onClose());
	const navigate = useNavigate();

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
				<Search
					onKeyUp={(event) => {
						if (event.key === "Enter") {
							props.onSearch({
								text: text,
								state: state,
							});
							navigate("");
							props.onClose();
						}
					}}
				>
					<TextInput
						className="Input"
						placeholder="Search"
						icon={<IconSearch />}
						size={"xl"}
						value={text}
						onChange={(event) => {
							setText(event.target.value);
						}}
						autoFocus={true}
					/>
					<Select
						value={state}
						className="State"
						size={"xl"}
						placeholder="State"
						data={STATE_ABBREVIATIONS}
						onChange={(value) => {
							setState(value || "");
						}}
					/>
				</Search>
			}
		>
			<Center>
				<Text>
					Select from below, or press <Kbd>Enter</Kbd> to search
				</Text>
			</Center>
			<ScrollArea style={{ height: "calc(100vh - 210px)" }}>
				<SearchSuggestions>
					{isLoading ? <LoadingPage /> : null}
					{renderSearchSuggestions()}
				</SearchSuggestions>
			</ScrollArea>
		</StyledModal>
	);
}
