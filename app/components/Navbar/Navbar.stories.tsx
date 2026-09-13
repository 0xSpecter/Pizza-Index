import type { Meta, StoryObj } from "@storybook/react-vite";
import Navbar from "./Navbar";

const meta = {
	title: "Components/Navbar",
	component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Streaked: Story = {
	args: {
		variant: "streaked",
	},
};
