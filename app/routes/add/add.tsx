import { Controller, useForm } from "react-hook-form";
import Page from "~/components/Page/Page";
import RadioSet from "~/components/RadioBar/RadioSet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoommates } from "~/firebase/queries";
import { useAddPizza } from "~/firebase/mutations";
import { pizzaSize, type CreatePizzaProps } from "~/firebase/types";
import type { Route } from "./+types/add";
import styles from "./add.module.scss";
import z from "zod";
import { useTranslation } from "react-i18next";
import i18n from "~/i18n/i18n";
import { getAddPizzaPreferences, setAddPizzaPreferences } from "~/firebase/utils";

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

	const onSubmit = (pizza: CreatePizzaProps) => {
		addPizza(pizza, {
			onSuccess: () => {
				setAddPizzaPreferences(pizza.roommate, pizza.size);
				reset({ roommate: pizza.roommate, size: pizza.size })
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

				<button type="submit" className={styles.submit} disabled={isPending}>
					{isPending ? t("pizza.adding") : t("navbar.addPizza")}
				</button>

				{isSubmitSuccessful && <p className={styles.success}>{t("add.success")}</p>}
			</form>
		</Page>
	);
}
