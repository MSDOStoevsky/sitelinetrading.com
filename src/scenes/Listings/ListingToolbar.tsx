import * as React from "react";
import {
	Checkbox,
	Navbar,
	Popover,
	ActionIcon,
	NavbarProps,
	Radio,
	Stack,
	Tooltip,
	Indicator,
} from "@mantine/core";
import { IconArrowsSort, IconFilter } from "@tabler/icons";
import styled from "@emotion/styled";

const NavbarWrapper = styled(Navbar)`
	gap: 1rem;
	flex-direction: ${(props: Props) => {
		return props.direction;
	}};
`;

const Dropdown = styled(Popover.Dropdown)`
	max-height: 100vh;
	overflow: auto;
`;

interface Props extends Omit<NavbarProps, "children"> {
	direction: "row" | "column";
}

/**
 *
 */
export function ListingToolbar(props: Props) {
	const popoverPosition = props.direction === "column" ? "right" : "bottom";
	const [sortSelection, setSortSelection] = React.useState<
		string | undefined
	>(undefined);

	const [filterSelection, setFilterSelection] = React.useState();

	return (
		<NavbarWrapper {...props}>
			<Popover shadow="md" width={200} position={popoverPosition}>
				<Popover.Target>
					<Tooltip label="Sort listings">
						<ActionIcon size="lg">
							<IconArrowsSort />
						</ActionIcon>
					</Tooltip>
				</Popover.Target>

				<Dropdown>
					<Radio.Group
						orientation="vertical"
						label="Sort By"
						onChange={setSortSelection}
						value={sortSelection}
					>
						<Radio value="price-asc" label="Price Ascending" />
						<Radio value="price-desc" label="Price Descending" />
						<Radio value="name-desc" label="Name A-Z" />
						<Radio value="name-asc" label="Name Z-A" />
					</Radio.Group>
				</Dropdown>
			</Popover>

			<Popover shadow="md" width={200} position={popoverPosition}>
				<Popover.Target>
					<Tooltip label="Filter listings (active)">
						<ActionIcon size="lg" color="blue">
							<IconFilter />
						</ActionIcon>
					</Tooltip>
				</Popover.Target>

				<Dropdown>
					<Stack>
						<Checkbox.Group
							orientation="vertical"
							label="Condition"
						>
							<Checkbox value="new" label="New" />
							<Checkbox value="refurbished" label="Refurbished" />
							<Checkbox value="asis" label="As-is" />
						</Checkbox.Group>
						<Checkbox.Group orientation="vertical" label="Tags">
							<Checkbox value="sale" label="On Sale" />
						</Checkbox.Group>
						<Checkbox.Group orientation="vertical" label="Category">
							<Checkbox value="rifle" label="Rifle" />
							<Checkbox value="handgun" label="Handgun" />
							<Checkbox value="shotgun" label="Shotgun" />
							<Checkbox
								value="gear-and-accessories"
								label="Gear and Accessories"
							/>
						</Checkbox.Group>
						<Checkbox.Group orientation="vertical" label="Caliber">
							<Checkbox value="9mm" label="9mm" />
							<Checkbox value="10mm" label="10mm" />
							<Checkbox value="5.56" label="5.56" />
							<Checkbox value="308" label="308" />
							<Checkbox value="300AAC" label="300AAC" />
							<Checkbox value="50BMG" label="50 BMG" />
							<Checkbox value="5.7x28mm" label="5.7x28mm" />
						</Checkbox.Group>
					</Stack>
				</Dropdown>
			</Popover>
		</NavbarWrapper>
	);
}
