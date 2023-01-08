import { TextInputProps } from "@mantine/core";
import { ActionIcon, TextInput } from "@mantine/core";
import { IconLock, IconLockOpen } from "@tabler/icons";
import * as React from "react";

type LockableInputProps = Omit<TextInputProps, "rightSection" | "disabled">;

export function LockableInput(props: LockableInputProps) {
	const [isLocked, setIsLocked] = React.useState<boolean>(true);

	return (
		<TextInput
			{...props}
			disabled={isLocked}
			rightSection={
				<ActionIcon
					size="lg"
					variant="transparent"
					color="blue"
					onClick={() => setIsLocked(!isLocked)}
				>
					{isLocked ? <IconLock /> : <IconLockOpen />}
				</ActionIcon>
			}
		/>
	);
}
