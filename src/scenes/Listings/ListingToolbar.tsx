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
import {
	FilterExpression,
	Order,
	OrderExpression,
} from "../../api/SearchExpression";

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

	filterExpression: Record<string, string | boolean> | undefined;

	onSortChange(sortState: OrderExpression): void;

	onFilterChange(filterState: FilterExpression): void;
}

/**
 *
 */
export function ListingToolbar(props: Props) {
	const popoverPosition = props.direction === "column" ? "right" : "bottom";
	const [sortSelection, setSortSelection] = React.useState<string>("");
	const [openToTrade, setOpenToTrade] = React.useState<string>("");

	React.useEffect(() => {
		if (sortSelection) {
			const splitSortSelection = _.split(sortSelection, "-");
			props.onSortChange({
				field: splitSortSelection[0],
				order: splitSortSelection[1] as Order,
			});
		}
	}, [sortSelection]);

	React.useEffect(() => {
		if (openToTrade) {
			props.onFilterChange({
				...props.filterExpression,
				openToTrade: openToTrade === "false" ? false : true,
			});
		}
	}, [openToTrade]);

	return (
		<NavbarWrapper {...props}>
			<Popover shadow="md" width={200} position={popoverPosition}>
				<Popover.Target>
					<Tooltip
						label={`Sort listings${
							sortSelection ? " (active)" : ""
						}`}
					>
						<ActionIcon
							size="lg"
							color={sortSelection ? "blue" : "gray"}
						>
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
						<Radio value="value-ASC" label="value ascending" />
						<Radio value="value-DESC" label="value descending" />
						<Radio value="" label="none" />
					</Radio.Group>
				</Dropdown>
			</Popover>

			<Popover shadow="md" width={200} position={popoverPosition}>
				<Popover.Target>
					<Tooltip
						label={`Filter listings${
							openToTrade ? " (active)" : ""
						}`}
					>
						<ActionIcon
							size="lg"
							color={openToTrade ? "blue" : undefined}
						>
							<IconFilter />
						</ActionIcon>
					</Tooltip>
				</Popover.Target>
				<Dropdown>
					<Stack>
						<Radio.Group
							orientation="vertical"
							label="Accepting Trades"
							value={openToTrade}
							onChange={setOpenToTrade}
						>
							<Radio value={"true"} label="Yes" />
							<Radio value={"false"} label="No" />
							<Radio value="" label="Either" />
						</Radio.Group>
					</Stack>
				</Dropdown>
			</Popover>
		</NavbarWrapper>
	);
}
