import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";
import styles from "./Button.module.scss";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Button",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Boxy: Story = {
	args: {
		className: styles.boxy,
	}
};

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
