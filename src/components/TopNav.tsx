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
} from "@mantine/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { SearchSheet } from "./SearchSheet";
import { IconSearch, IconShoppingCart, IconUser } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const NavTitle = styled(Title)`
	line-height: 1;
`;

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
	 * Whether the user is logged in
	 */
	isLoggedIn: boolean;
	/**
	 * Called when login is clicked
	 */
	onLoginClick(): void;
	/**
	 * Called when signup is clicked
	 */
	onSignupClick(): void;
}

/**
 *
 */
export function TopNav(props: Props) {
	const [isSearchDrawerOpen, setIsSearchDrawerOpen] =
		React.useState<boolean>(false);
	const [searchEntry, setSearchEntry] = React.useState("");
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
				<Menu.Item component={Link} to="/account/i-want-to-sell">
					I want to sell
				</Menu.Item>
				<Menu.Item component={Link} to="/account/order-history">
					Order history
				</Menu.Item>
				<Menu.Item component={Link} to="/account/message-center">
					Message center
				</Menu.Item>
				<Menu.Item component={Link} to="/account/account-settings">
					Account settings
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
			<LeftContent>
				<NavTitle>Siteline</NavTitle>
			</LeftContent>
			<CenterContent>
				<TextInput
					icon={<IconSearch />}
					placeholder="Search"
					size={"md"}
					value={searchEntry}
					readOnly
					ref={searchInputRef ? searchInputRef : undefined}
					onFocus={() => setIsSearchDrawerOpen(true)}
				/>
				<SearchSheet
					searchEntry={searchEntry}
					isOpen={isSearchDrawerOpen}
					onClose={() => {
						console.log(searchInputRef.current);
						setIsSearchDrawerOpen(false);
						searchInputRef.current?.blur();
					}}
					onSearch={(searchEntry) => {
						// set
					}}
					onChange={setSearchEntry}
				/>
			</CenterContent>
			<RightContent>
				
                <ActionIcon
                    component={Link}
                    to="/cart/"
                    size="lg"
                    title="my cart"
                >
                    <IconShoppingCart />
                </ActionIcon>
				{props.isLoggedIn ? isLoggedInMenu : defaultMenu}
			</RightContent>
		</TopNavWrapper>
	);
}
