import type { Meta, StoryObj } from "@storybook/react-vite";
import Pizza from "./Pizza";
import styles from "./Pizza.module.scss";

const meta = {
	title: "Components/Pizza",
	component: Pizza,
	parameters: {
		layout: "centered",
	},
	args: {
	},
} satisfies Meta<typeof Pizza>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
