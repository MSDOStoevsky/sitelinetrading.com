import * as React from "react";
import {
	Center,
	Stack,
	Image,
	TextInput,
	Title,
	Modal,
	Kbd,
	Text,
	Select,
	ScrollArea,
	createStyles,
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
import { showNotification } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";

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

const useStyles = createStyles((theme, _params, getRef) => ({
	columnSearch: {
		display: "flex",
		flexDirection: "column",
		" .Input": {
			flex: 1,
			input: {
				borderBottomLeftRadius: "0px",
				borderBottomRightRadius: "0px",
			},
		},
		" .State": {
			flex: 1,
			input: {
				borderTopLeftRadius: "0px",
				borderTopRightRadius: "0px",
			},
		},
	},
	rowSearch: {
		display: "flex",
		flexDirection: "row",
		" .Input": {
			flex: 4,
			input: {
				borderTopRightRadius: "0px",
				borderBottomRightRadius: "0px",
			},
		},
		" .State": {
			flex: 1,
			input: {
				borderTopLeftRadius: "0px",
				borderBottomLeftRadius: "0px",
			},
		},
	},
}));

export function SearchSheet(props: Props) {
	const [text, setText] = React.useState(props.searchEntry.text);
	const [state, setState] = React.useState<string>(props.searchEntry.state);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [listingSuggestions, setListingSuggestions] = React.useState<
		ApiPaginatedSearchResponse<Product> | undefined
	>(undefined);
	const isSmallScreen = useMediaQuery("(max-width: 576px)");
	const { classes } = useStyles();

	React.useEffect(() => {
		if (!props.isOpen) {
			return;
		}
		getPreviews();
		props.onChange({ text, state });
	}, [text, state, props.isOpen]);

	async function getPreviews() {
		setIsLoading(true);
		try {
			const searchResults = await searchAllProducts({
				filterExpression: { title: text, state: state },
				orderBy: {
					field: "title",
					order: "DESC",
				},
				page: 0,
				pageSize: 10,
				select: "*",
			});

			setListingSuggestions(searchResults);
		} catch (error) {
			showNotification({
				title: "Error",
				message: "error trying to search",
			});
		} finally {
			setIsLoading(false);
		}
	}

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
							src={listing.image}
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
				<div
					className={
						isSmallScreen ? classes.columnSearch : classes.rowSearch
					}
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
						data={["", ...STATE_ABBREVIATIONS]}
						onChange={(value) => {
							setState(value || "");
						}}
					/>
				</div>
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
