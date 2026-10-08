import type { Meta, StoryObj } from "@storybook/react-vite";
import AddPizzaButton from "./AddPizzaButton";

const meta = {
	title: "Components/AddPizzaButton",
	component: AddPizzaButton,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof AddPizzaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: {
		size: "sm",
	}
};

export const Medium: Story = {
	args: {
		size: "md",
	}
};

export const Large: Story = {
	args: {
		size: "lg",
	}
};

export const Disabled: Story = {
	args: {
		disabled: true,
	}
};
