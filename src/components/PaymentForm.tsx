"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/contexts/PaymentProvider";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
	payment_method: z
		.string({
			required_error: "Wybierz metode płatności",
		})
		.min(1, { message: "Wybierz metode płatności" }),
});

export const PaymentForm = () => {
	const router = useRouter();
	const { setPaymentMethod } = usePayment();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			payment_method: "",
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		setPaymentMethod(data.payment_method);
		router.push("/summary");
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="payment_method"
					render={({ field }) => (
						<>
							<FormItem>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Wybierz metode płatności" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="blik">Blik</SelectItem>
											<SelectItem value="p24">Przelewy24</SelectItem>
											<SelectItem value="klarna">Klarna</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<Button type="submit" className="w-full max-w-xs">
					Przejdź do podsumowania
				</Button>
			</form>
		</Form>
	);
};
