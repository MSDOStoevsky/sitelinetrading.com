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
import _ from "lodash";

type FilterState = Record<string, string[]>;

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

	onSortChange(sortState: string[]): void;

	onFilterChange(filterState: FilterState): void;
}

/**
 *
 */
export function ListingToolbar(props: Props) {
	const popoverPosition = props.direction === "column" ? "right" : "bottom";
	const [sortSelection, setSortSelection] =
		React.useState<string>("name-DESC");
	const [filterSelection, setFilterSelection] = React.useState<FilterState>({
		condition: [],
	});

	React.useEffect(() => {
		const splitSortSelection = _.split(sortSelection, "-");
		props.onSortChange(splitSortSelection);
	}, [sortSelection]);

	React.useEffect(() => {
		props.onFilterChange(filterSelection);
	}, [filterSelection]);

	return (
		<NavbarWrapper {...props}>
			<Popover shadow="md" width={200} position={popoverPosition}>
				<Popover.Target>
					<Tooltip label="Sort listings">
						<ActionIcon size="lg" color={"gray"}>
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
						<Radio value="title-DESC" label="title A-Z" />
						<Radio value="title-ASC" label="title Z-A" />
						<Radio value="price-ASC" label="Price Ascending" />
						<Radio value="price-DESC" label="Price Descending" />
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
							label="Accepting Trades"
							value={filterSelection.condition}
							onChange={(value) => {
								setFilterSelection((oldFilterSelection) => {
									return {
										...oldFilterSelection,
										acceptsTrades: value,
									};
								});
							}}
						>
							<Checkbox value="yes" label="Yes" />
							<Checkbox value="no" label="No" />
						</Checkbox.Group>
					</Stack>
				</Dropdown>
			</Popover>
		</NavbarWrapper>
	);
}
