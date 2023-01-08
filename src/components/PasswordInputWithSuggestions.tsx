import * as React from "react";
import { IconX, IconCheck } from "@tabler/icons";
import {
	PasswordInput,
	Progress,
	Text,
	Popover,
	Box,
	PasswordInputProps,
} from "@mantine/core";
import _ from "lodash";

interface Props extends PasswordInputProps {
	requirements?: Array<{
		re: RegExp;
		label: string;
	}>;
}

function PasswordRequirement({
	meets,
	label,
}: {
	meets: boolean;
	label: string;
}) {
	return (
		<Text
			color={meets ? "teal" : "red"}
			sx={{ display: "flex", alignItems: "center" }}
			mt={7}
			size="sm"
		>
			{meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
			<Box ml={10}>{label}</Box>
		</Text>
	);
}

export function PasswordInputWithSuggestions(props: Props) {
	const { requirements, ...inputProps } = props;
	const [popoverOpened, setPopoverOpened] = React.useState(false);

	const checks = _.map(requirements, (requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(inputProps.value as string)}
		/>
	));

	return (
		<Popover
			opened={popoverOpened}
			position="bottom"
			width="target"
			transition="pop"
		>
			<Popover.Target>
				<div
					onFocusCapture={() => setPopoverOpened(true)}
					onBlurCapture={() => setPopoverOpened(false)}
				>
					<PasswordInput {...inputProps} />
				</div>
			</Popover.Target>
			<Popover.Dropdown>
				<PasswordRequirement
					label="Includes at least 12 characters"
					meets={(inputProps.value as string).length > 12}
				/>
				{checks}
			</Popover.Dropdown>
		</Popover>
	);
}
