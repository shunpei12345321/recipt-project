import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
	try {
		const { customer_id, receipt_date, details } = await req.json();

		const newReceipt = await prisma.receipt.create({
			data: {
				customer_id,
				receipt_date: new Date(receipt_date),
				details: {
					create: details.map(
						(detail: {
							product_id: number;
							quantity: number;
							total_price: number;
						}) => ({
							product_id: detail.product_id,
							quantity: detail.quantity,
							total_price: detail.total_price,
						})
					),
				},
			},
		});

		return NextResponse.json(newReceipt);
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
};
