import { useForm } from "react-hook-form";
import Page from "~/components/Page/Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoommates } from "~/firebase/queries";
import { useAddPizza } from "~/firebase/mutations";
import type { CreatePizzaProps } from "~/firebase/types";
import type { Route } from "./+types/add";
import styles from "./add.module.scss";
import z from "zod";

interface AddPizzaFormValues {
	roommate: string;
	type: string;
	brand: string;
	price: number;
	grams: number;
	discounted: boolean;
}

const addPizzaSchema = z.object({
	roommate: z.string(),
	type: z.string(),
	brand: z.string(),
	price: z.number(),
	grams: z.number(),
	discounted: z.boolean(),
}) satisfies z.ZodType<AddPizzaFormValues>

type AddPizzaSchema = z.infer<typeof addPizzaSchema>

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Add a pizza – Pizzaindex" },
		{ name: "description", content: "Log a frozen pizza you just ate" },
	];
}

export default function Add() {
	const { data: roommates, isLoading: loadingRoommates } = useRoommates();
	const { mutate: addPizza, isPending } = useAddPizza();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<AddPizzaSchema>({
		resolver: zodResolver(addPizzaSchema),
	});

	const onSubmit = (data: AddPizzaFormValues) => {
		const pizza: CreatePizzaProps = {
			type: data.type || undefined,
			brand: data.brand || undefined,
			price: Number.isNaN(data.price) ? undefined : data.price,
			grams: Number.isNaN(data.grams) ? undefined : data.grams,
			discounted: data.discounted,
		};

		addPizza({ name: data.roommate, pizza }, { onSuccess: () => reset() });
	};

	return (
		<Page className={styles.add}>
			<h1 className={styles.header}>Add a pizza</h1>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.field}>
					Who ate it?
					<select defaultValue="" disabled={loadingRoommates} {...register("roommate", { required: true })}>
						<option value="" disabled>Select a roommate</option>
						{roommates?.map((roommate) => (
							<option key={roommate.name} value={roommate.name}>
								{roommate.name}
							</option>
						))}
					</select>
					{errors.roommate && <span className={styles.error}>Pick a roommate</span>}
				</label>

				<label className={styles.field}>
					Brand
					<input type="text" placeholder="e.g. Dr. Oetker" {...register("brand")} />
				</label>

				<label className={styles.field}>
					Type
					<input type="text" placeholder="e.g. Margherita" {...register("type")} />
				</label>

				<label className={styles.field}>
					Price
					<input type="number" step="0.01" min="0" {...register("price", { valueAsNumber: true })} />
				</label>

				<label className={styles.field}>
					Grams
					<input type="number" min="0" {...register("grams", { valueAsNumber: true })} />
				</label>

				<label className={styles.checkbox}>
					<input type="checkbox" {...register("discounted")} />
					On discount
				</label>

				<button type="submit" className={styles.submit} disabled={isPending}>
					{isPending ? "Adding…" : "Add pizza"}
				</button>

				{isSubmitSuccessful && <p className={styles.success}>Pizza logged!</p>}
			</form>
		</Page>
	);
}
