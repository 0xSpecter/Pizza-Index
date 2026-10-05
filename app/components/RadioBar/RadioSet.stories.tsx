import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import RadioSet from "./RadioSet";

const meta = {
	title: "Components/RadioSet",
	component: RadioSet,
	parameters: {
		layout: "centered",
	},
	args: {
		name: "Roommate",
		options: [
			"Sigurd",
			"Viktor",
			"Jeff",
			"Alvar Impola",
		],
	},
	render: (args) => {
		const [value, setValue] = useState(0);
		return (
			<RadioSet {...args}
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
			/>
		)
	}
} satisfies Meta<typeof RadioSet>;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Circle: Story = {
	args: {
		variant: "circle",
		options: [
			"1",
			"2",
			"3",
			"4",
		],
	},
};
export const CircleLarge: Story = {
	args: {
		variant: "circle"
	}
};
