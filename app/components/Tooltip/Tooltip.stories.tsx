import type { Meta, StoryObj } from "@storybook/react-vite";
import Tooltip from "./Tooltip";
import Button from "../Button/Button";

const meta = {
	title: "Components/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
	},
	args: {
		label: "Tooltip label",
		children: <Button>Hover me</Button>,
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Right: Story = {
	args: {
		position: "right",
	}
};

export const Top: Story = {
	args: {
		position: "top",
	}
}

export const Bottom: Story = {
	args: {
		position: "bottom",
	}
}
