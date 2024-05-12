"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useProducts } from "@/contexts/ProductsProvider";
import { v4 as uuidv4 } from "uuid";

const FormSchema = z.object({
	name: z.string().max(20, {
		message: "Nazwa produktu może mieć maksymalnie 20 znaków",
	}),
	price: z
		.string({ required_error: "Cena jest wymagana" })
		.min(1, { message: "Cena musi być wieksza od 0" })
		.refine((val) => !val.includes("-"), "Cena nie może być wartością ujemną"),
	requiresShipping: z.boolean().optional(),
});

export const AddProductForm = () => {
	const { addProduct } = useProducts();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			price: "",
			requiresShipping: false,
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		toast({
			title: "Dodałeś następujący produkt:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
		addProduct({
			id: uuidv4(),
			name: data.name,
			price: data.price,
			requiresShipping: data.requiresShipping,
		});
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Nazwa propduktu</FormLabel>
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
					name="price"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Cena</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={form.control}
					name="requiresShipping"
					render={({ field: { onChange, value } }) => (
						<FormItem className="flex flex-row items-center space-x-3">
							<FormControl>
								<Input
									type="checkbox"
									value={value ? "true" : "false"}
									onChange={onChange}
									className="h-4 w-4 checked:bg-primary"
								/>
							</FormControl>
							<FormLabel className="!mt-0">Wymagaj dostawy</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="text-white">
					Dodaj produkt
				</Button>
			</form>
		</Form>
	);
};
