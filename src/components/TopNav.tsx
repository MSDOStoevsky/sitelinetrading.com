import * as React from "react";
import {
	Title,
	Header,
	Menu,
	Popover,
	HoverCard,
	TextInput,
	Text,
	ActionIcon,
	Overlay,
	Anchor,
	MediaQuery,
	Select,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { SearchSheet } from "./SearchSheet";
import {
	IconLogout,
	IconPencil,
	IconSearch,
	IconSelector,
	IconUser,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { SearchEntry } from "../App";
import { Search } from "../utils/commonStyles";

const TopNavWrapper = styled(Header)`
	display: flex;
	justify-content: space-between;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
`;

const LeftContent = styled.div`
	display: flex;
	justify-content: flex-start;
	flex: 1;
`;

const CenterContent = styled.div`
	flex: 4;
`;

const RightContent = styled.div`
	display: flex;
	justify-content: flex-end;
	flex: 1;
	margin: auto;
	gap: 1rem;
`;

interface Props {
	/**
	 * The users ID
	 */
	userId?: string;
	/**
	 * Called when login is clicked
	 */
	onLoginClick(): void;
	/**
	 * Called when log out is clicked
	 */
	onLogoutClick(): void;
	/**
	 * Called when signup is clicked
	 */
	onSignupClick(): void;
	/**
	 *
	 * @param searchEntry
	 */
	onSearch(searchEntry: SearchEntry): void;
}

/**
 *
 */
export function TopNav(props: Props) {
	const [isSearchDrawerOpen, setIsSearchDrawerOpen] =
		React.useState<boolean>(false);
	const [searchEntry, setSearchEntry] = React.useState<SearchEntry>({
		text: "",
		state: "",
	});
	let searchInputRef = React.useRef<null | HTMLInputElement>(null);
	const navigate = useNavigate();

	const isLoggedInMenu = (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon size="lg" title="my account">
					<IconUser />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>My Account</Menu.Label>
				<Menu.Item component={Link} to="/account/listings">
					Listings
				</Menu.Item>
				<Menu.Item component={Link} to={`/users/${props.userId}`}>
					Feedback
				</Menu.Item>
				<Menu.Item component={Link} to="/account/message-center">
					Message center
				</Menu.Item>
				<Menu.Item component={Link} to="/account/account-settings">
					Account settings
				</Menu.Item>
				<Menu.Item
					icon={<IconLogout size={15} />}
					onClick={props.onLogoutClick}
					color="red"
				>
					Log out
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);

	const defaultMenu = (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon size="lg" title="my account">
					<IconUser />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item onClick={props.onLoginClick}>Log in</Menu.Item>
				<Menu.Item onClick={props.onSignupClick}>Sign up</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);

	return (
		<TopNavWrapper height={60} p="xs">
			<MediaQuery
				smallerThan={"xs"}
				styles={{ display: "none !important" }}
			>
				<LeftContent>
					<Title>
						<Anchor
							inherit
							onClick={() => {
								navigate(`news/`);
							}}
						>
							Siteline
						</Anchor>
					</Title>
				</LeftContent>
			</MediaQuery>
			<CenterContent>
				<Search>
					<TextInput
						icon={<IconSearch />}
						className="Input"
						placeholder="Search"
						size={"md"}
						value={searchEntry.text}
						readOnly
						ref={searchInputRef ? searchInputRef : undefined}
						onFocus={() => setIsSearchDrawerOpen(true)}
					/>
					<TextInput
						rightSection={<IconSelector />}
						value={searchEntry.state}
						className="State"
						size={"md"}
						placeholder="State"
						readOnly
						onFocus={() => setIsSearchDrawerOpen(true)}
					/>
				</Search>
				<SearchSheet
					searchEntry={searchEntry}
					isOpen={isSearchDrawerOpen}
					onClose={() => {
						setIsSearchDrawerOpen(false);
						searchInputRef.current?.blur();
					}}
					onSearch={props.onSearch}
					onChange={setSearchEntry}
				/>
			</CenterContent>
			<RightContent>
				<ActionIcon
					component={Link}
					to="/post/"
					size="lg"
					title="make a listing"
				>
					<IconPencil />
				</ActionIcon>
				{!!props.userId ? isLoggedInMenu : defaultMenu}
			</RightContent>
		</TopNavWrapper>
	);
}
