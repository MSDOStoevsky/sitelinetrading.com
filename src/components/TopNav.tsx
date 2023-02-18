import * as React from "react";
import {
	Title,
	Header,
	Menu,
	TextInput,
	ActionIcon,
	Anchor,
	MediaQuery,
	Drawer,
	Button,
	Stack,
	Divider,
	Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { SearchSheet } from "./SearchSheet";
import {
	IconBrandGithub,
	IconCurrencyDollar,
	IconEdit,
	IconExternalLink,
	IconLogin,
	IconLogout,
	IconMenu,
	IconPencil,
	IconQuestionMark,
	IconRadio,
	IconSearch,
	IconSelector,
	IconUser,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { SearchEntry } from "../App";
import { Search } from "../utils/commonStyles";
import { useMediaQuery } from "@mantine/hooks";

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
	 * The users display name
	 */
	displayName?: string;
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
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [isMobileDrawerOpen, setIsMobileDrawerOpen] =
		React.useState<boolean>(false);

	const generalMenuItems = (
		<>
			<Menu.Label>1.0.0-alpha</Menu.Label>
			<Menu.Item
				component={Link}
				to="/news"
				icon={<IconRadio size={15} />}
			>
				News
			</Menu.Item>
			<Menu.Item
				component={Link}
				to="/legal"
				icon={<IconQuestionMark size={15} />}
			>
				FAQ/Legal
			</Menu.Item>
			<Menu.Item
				component="a"
				target="_blank"
				href="https://github.com/MSDOStoevsky/sitelinetrading.com/"
				icon={<IconBrandGithub size={15} />}
				rightSection={<IconExternalLink size={15} />}
			>
				GitHub
			</Menu.Item>
			<Menu.Item
				component="a"
				target="_blank"
				href="https://www.buymeacoffee.com/MSDOStoevsky"
				icon={<IconCurrencyDollar size={15} />}
				rightSection={<IconExternalLink size={15} />}
			>
				Contribute
			</Menu.Item>
			<Menu.Divider />
		</>
	);

	const isLoggedOutMenuItems = (
		<>
			{generalMenuItems}
			<Menu.Item
				onClick={props.onLoginClick}
				icon={<IconLogin size={15} />}
			>
				Log in
			</Menu.Item>
			<Menu.Item
				onClick={props.onSignupClick}
				icon={<IconEdit size={15} />}
			>
				Sign up
			</Menu.Item>
		</>
	);

	const isLoggedInMenuItems = (
		<>
			{generalMenuItems}
			<Menu.Label>{props.displayName || props.userId}</Menu.Label>
			<Menu.Item component={Link} to={`/users/${props.userId}`}>
				Me
			</Menu.Item>
			<Menu.Item component={Link} to="/account/message-center">
				Messages
			</Menu.Item>
			<Menu.Item component={Link} to="/account/account-settings">
				Settings
			</Menu.Item>
			<Menu.Item
				icon={<IconLogout size={15} />}
				onClick={props.onLogoutClick}
				color="red"
			>
				Log out
			</Menu.Item>
		</>
	);

	const isLoggedInMenu = (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon size="lg" title="my account">
					<IconUser />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>{isLoggedInMenuItems}</Menu.Dropdown>
		</Menu>
	);

	const defaultMenu = (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon size="lg" title="my account">
					<IconUser />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>{isLoggedOutMenuItems}</Menu.Dropdown>
		</Menu>
	);

	const desktopMenu = !!props.userId ? isLoggedInMenu : defaultMenu;

	const menuOnMobile = (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon size="lg" title="menu">
					<IconMenu />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<>
					<Menu.Item component={Link} to="/post/">
						Post
					</Menu.Item>
					<Menu.Item component={Link} to="/news/">
						News
					</Menu.Item>
					<Menu.Divider />
				</>
				{!!props.userId ? isLoggedInMenuItems : isLoggedOutMenuItems}
			</Menu.Dropdown>
		</Menu>
	);

	return (
		<TopNavWrapper height={60} p="xs" zIndex={100}>
			<MediaQuery
				smallerThan={"xs"}
				styles={{ display: "none !important" }}
			>
				<LeftContent>
					<Title>
						<Anchor
							inherit
							onClick={() => {
								navigate(`/`);
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

					<MediaQuery
						query="(max-width: 768px)"
						styles={{ display: "none" }}
					>
						<TextInput
							rightSection={<IconSelector />}
							value={searchEntry.state}
							className="State"
							size={"md"}
							placeholder="State"
							readOnly
							onFocus={() => setIsSearchDrawerOpen(true)}
						/>
					</MediaQuery>
				</Search>
				<SearchSheet
					searchEntry={searchEntry}
					isOpen={isSearchDrawerOpen}
					onClose={() => {
						setIsSearchDrawerOpen(false);
						searchInputRef.current?.blur();
					}}
					onSearch={(value) => { props.onSearch(value); setSearchEntry(value) }}
				/>
			</CenterContent>
			<RightContent>
				{!isMobile ? (
					<ActionIcon
						component={Link}
						to="/post/"
						size="lg"
						title="make a listing"
					>
						<IconPencil />
					</ActionIcon>
				) : null}
				{isMobile ? (
					<ActionIcon
						size="lg"
						title="menu"
						onClick={() => setIsMobileDrawerOpen(true)}
					>
						<IconMenu />
					</ActionIcon>
				) : (
					desktopMenu
				)}
			</RightContent>
			<Drawer
				opened={isMobileDrawerOpen}
				onClose={() => setIsMobileDrawerOpen(false)}
				title="Menu"
				padding="xl"
				size="full"
				position="top"
			>
				<Stack>
					<Button
						component={Link}
						to="/post"
						color="gray"
						fullWidth
						onClick={() => setIsMobileDrawerOpen(false)}
					>
						Post
					</Button>
					<Divider />
					<Text>1.0.0-alpha</Text>
					<Button
						component={Link}
						to="/news"
						leftIcon={<IconRadio size={15} />}
						color="gray"
						fullWidth
						onClick={() => setIsMobileDrawerOpen(false)}
					>
						News
					</Button>
					<Button
						component={Link}
						to="/legal"
						leftIcon={<IconQuestionMark size={15} />}
						color="gray"
						fullWidth
						onClick={() => setIsMobileDrawerOpen(false)}
					>
						FAQ/Legal
					</Button>
					<Button
						component="a"
						target="_blank"
						href="https://github.com/MSDOStoevsky/sitelinetrading.com/"
						leftIcon={<IconBrandGithub size={15} />}
						rightIcon={<IconExternalLink size={15} />}
						color="gray"
						fullWidth
						onClick={() => setIsMobileDrawerOpen(false)}
					>
						GitHub
					</Button>
					<Button
						component="a"
						target="_blank"
						href="https://www.buymeacoffee.com/MSDOStoevsky"
						leftIcon={<IconCurrencyDollar size={15} />}
						rightIcon={<IconExternalLink size={15} />}
						color="gray"
						onClick={() => setIsMobileDrawerOpen(false)}
					>
						Contribute
					</Button>
					<Menu.Divider />

					{!!props.userId ? (
						<>
							<Text>{props.userId}</Text>
							<Button
								component={Link}
								to={`/users/${props.userId}`}
								color="gray"
								onClick={() => setIsMobileDrawerOpen(false)}
							>
								Me
							</Button>
							<Button
								component={Link}
								to="/account/message-center"
								color="gray"
								onClick={() => setIsMobileDrawerOpen(false)}
							>
								Messages
							</Button>
							<Button
								component={Link}
								to="/account/account-settings"
								color="gray"
								onClick={() => setIsMobileDrawerOpen(false)}
							>
								Settings
							</Button>
							<Button
								leftIcon={<IconLogout size={15} />}
								color="red"
								onClick={() => {
									setIsMobileDrawerOpen(false);
									props.onLogoutClick();
								}}
							>
								Log out
							</Button>
						</>
					) : (
						<>
							<Button
								leftIcon={<IconLogin size={15} />}
								color="gray"
								onClick={() => {
									setIsMobileDrawerOpen(false);
									props.onLoginClick();
								}}
							>
								Log in
							</Button>
							<Button
								leftIcon={<IconEdit size={15} />}
								color="gray"
								onClick={() => {
									setIsMobileDrawerOpen(false);
									props.onSignupClick();
								}}
							>
								Sign up
							</Button>
						</>
					)}
				</Stack>
			</Drawer>
		</TopNavWrapper>
	);
}
