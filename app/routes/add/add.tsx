import { Controller, useForm } from "react-hook-form";
import Page from "~/components/Page/Page";
import RadioSet from "~/components/RadioBar/RadioSet";
import AddPizzaButton from "~/components/AddPizzaButton/AddPizzaButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoommates } from "~/firebase/queries";
import { useAddPizza, useRemovePizza } from "~/firebase/mutations";
import { pizzaSize, type CreatePizzaProps } from "~/firebase/types";
import type { Route } from "./+types/add";
import styles from "./add.module.scss";
import z from "zod";
import { useTranslation } from "react-i18next";
import i18n from "~/i18n/i18n";
import { getAddPizzaPreferences, addToAddedPizzas, getAddedPizzas, removePizzaFromAddedPizzas } from "~/firebase/utils";
import { useLocalStorageItem } from "~/hooks/useLocalStorageItem";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: i18n.t("add.title") },
		{ name: "description", content: i18n.t("add.description") },
	];
}

export default function Add() {
	const { t } = useTranslation();
	const { data: roommates } = useRoommates();
	const roommateNames: string[] = roommates.map(mate => mate.name);

	const pizzaPreferences = getAddPizzaPreferences()

	const { mutate: addPizza, isPending } = useAddPizza();
	const { mutate: removePizza } = useRemovePizza();

	const addPizzaSchema = z.object({
		roommate: z.enum(roommateNames),
		size: z.enum(pizzaSize),
	}) satisfies z.ZodType<CreatePizzaProps>

	type AddPizzaSchema = z.infer<typeof addPizzaSchema>

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<AddPizzaSchema>({
		resolver: zodResolver(addPizzaSchema),
		defaultValues: {
			roommate: pizzaPreferences.roommateName ?? roommateNames[0],
			size: pizzaPreferences.size ?? pizzaSize[1],
		}
	});

	const { item, set, del } = useLocalStorageItem({
		set: addToAddedPizzas,
		get: getAddedPizzas,
		del: removePizzaFromAddedPizzas,
	})

	const onSubmit = (pizza: CreatePizzaProps) => {
		addPizza(pizza, {
			onSuccess: (pizza) => {
				reset({ roommate: pizza.roommate, size: pizza.size })
				set(pizza)
			}
		});
	};


	return (
		<Page className={styles.add}>
			<h1 className={styles.header}>{t("pizza.addPizza")}</h1>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.field}>
					{t("add.who")}
					<Controller
						name="roommate"
						control={control}
						render={({ field }) => (
							<RadioSet
								options={roommateNames}
								name={field.name}
								value={roommateNames.indexOf(field.value)}
								onChange={(index) => field.onChange(roommateNames[index])}
								onBlur={field.onBlur}
							/>
						)}
					/>
					{errors.roommate && <span className={styles.error}>{t("add.pickRoommate")}</span>}
				</div>
				<div className={styles.field}>
					{t("pizza.size")}
					<Controller
						name="size"
						control={control}
						render={({ field }) => (
							<RadioSet
								options={["s", "m", "l"]}
								name={field.name}
								value={pizzaSize.indexOf(field.value)}
								onChange={(index) => field.onChange(pizzaSize[index])}
								onBlur={field.onBlur}
								variant="circle"
							/>
						)}
					/>
					{errors.size && <span className={styles.error}>{t("add.pickSize")}</span>}
				</div>

				<AddPizzaButton type="submit" className={styles.submit} disabled={isPending} />

				{isSubmitSuccessful && <p className={styles.success}>{t("add.success")}</p>}
			</form>
			<div className={styles.addedPizzas}>
				{item && item.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()).map(pizza => {
					return (
						<div className={styles.addedPizza} key={pizza.id}>
							<span className={styles.addedPizzaInfo}>
								<span className={styles.addedRoomate}>{pizza.roommate}</span>
								<span className={styles.addedSize}>
									{pizza.size}
								</span>
								<span className={styles.addedDate}>
									{pizza.createdAt.toDate().toLocaleDateString(i18n.language, { month: "short", day: "numeric" })}
								</span>
							</span>
							<button className={styles.addedPizzaDelete} onClick={() => removePizza(pizza.id, { onSuccess: () => del(pizza) })}>
								-
							</button>
						</div>
					)
				})}
			</div>
		</Page>
	);
}
