import type { Meta, StoryObj } from "@storybook/react-vite";
import Language from "./Language";

const meta = {
	title: "Components/Language",
	component: Language,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Language>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
