import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
	const url = new URL(req.url);
	const id = url.pathname.split("/").pop();

	if (!id) {
		return NextResponse.json({ error: "ID is required" }, { status: 400 });
	}

	try {
		const receipt = await prisma.receipt.findUnique({
			where: { receipt_id: Number(id) },
			include: {
				customer: true,
				details: {
					include: {
						product: true,
					},
				},
			},
		});

		if (!receipt) {
			return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
		}

		return NextResponse.json(receipt);
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
};
