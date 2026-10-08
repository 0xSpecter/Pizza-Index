import type { Meta, StoryObj } from "@storybook/react-vite";
import InfoCircle from "./InfoCircle";

const meta = {
	title: "Components/InfoCircle",
	component: InfoCircle,
	parameters: {
		layout: "centered",
	},
	args: {
		label: "Some helpful info",
	},
} satisfies Meta<typeof InfoCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: {
		size: "sm",
	}
};

export const Large: Story = {
	args: {
		size: "lg",
	}
};
