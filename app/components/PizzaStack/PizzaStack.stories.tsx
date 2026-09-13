import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import PizzaStack from "./PizzaStack";
import Button from "~/components/Button/Button";
import styles from "./PizzaStack.stories.module.scss";

const meta = {
	title: "Components/PizzaStack",
	component: PizzaStack,
	parameters: {
		layout: "centered",
	},
	args: {
		count: 5,
	},
} satisfies Meta<typeof PizzaStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [count, setCount] = useState(args.count);

		return (
			<div className={styles.demo}>
				<PizzaStack {...args} count={count} />
				<div className={styles.controls}>
					<Button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</Button>
					<Button onClick={() => setCount((c) => c + 1)}>+</Button>
				</div>
			</div>
		);
	},
};
