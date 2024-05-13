"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export const FormSchema = z.object({
	street: z
		.string({
			required_error: "Ulica jest wymagana",
		})
		.min(1, { message: "Ulica jest wymagana" }),
	city: z
		.string({
			required_error: "Miasto jest wymagane",
		})
		.min(1, { message: "Miasto jest wymagane" }),
	country: z
		.string({
			required_error: "Kraj jest wymagany",
		})
		.min(1, { message: "Kraj jest wymagany" }),
	deliveryMethod: z
		.string({
			required_error: "Metoda dostawy jest wymagana",
		})
		.min(1, { message: "Metoda dostawy jest wymagana" }),
});

type AddAddressFormProps = {
	requiresShipping?: boolean;
	form: UseFormReturn<z.infer<typeof FormSchema>>;
	deliveryCountry: string;
	setDeliveryCountry: Dispatch<SetStateAction<string>>;
};

export const AddAddressForm = ({
	requiresShipping,
	form,
	deliveryCountry,
	setDeliveryCountry,
}: AddAddressFormProps) => {
	return requiresShipping ? (
		<>
			<FormField
				control={form.control}
				name="street"
				render={({ field }) => (
					<>
						<FormItem>
							<FormLabel>Ulica</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					</>
				)}
			/>
			<FormField
				control={form.control}
				name="city"
				render={({ field }) => (
					<>
						<FormItem>
							<FormLabel>Miasto</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					</>
				)}
			/>
			<FormField
				control={form.control}
				name="country"
				render={({ field }) => (
					<FormItem className="flex flex-row items-center space-x-3">
						<FormControl>
							<Select
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
									setDeliveryCountry(value);
									form.resetField("deliveryMethod");
								}}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Wybierz kraj" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="pl">Polska</SelectItem>
										<SelectItem value="usa">USA</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{deliveryCountry && deliveryCountry !== "" && (
				<FormField
					control={form.control}
					name="deliveryMethod"
					render={({ field: { onChange, value } }) => (
						<FormItem className="flex flex-row items-center space-x-3">
							<FormControl>
								<Select value={value} onValueChange={onChange}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Wybierz przewoźnika" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem
												value="dpd"
												disabled={deliveryCountry !== "pl"}
											>
												DPD
											</SelectItem>
											<SelectItem value="ups">UPS</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
		</>
	) : (
		false
	);
};
