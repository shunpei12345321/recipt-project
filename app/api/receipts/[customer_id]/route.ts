import { NextResponse } from "next/server";

import prisma from "@/lib/PrismaClient";

export const GET = async (
	req: Request,
	{ params }: { params: { customer_id: string } },
	//params.customer_idと対応してる（型）
	res: NextResponse
) => {
	const customer_id = parseInt(params.customer_id);

	const receipts = await prisma.receipt.findMany({
		where: {
			customer_id: customer_id,
		},
		include: {
			details: {
				include: {
					product: true,
				},
			},
		},
	});

	const formattedReceipts = receipts.map((receipt) => ({
		...receipt,
		details: receipt.details.map((detail) => ({
			product_name: detail.product.product_name,
			quantity: detail.quantity,
			total_price: detail.total_price,
		})),
	}));

	return NextResponse.json(formattedReceipts);
};
