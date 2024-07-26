import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
	const { name, email } = await req.json();

	const new_customer = await prisma.customer.create({
		data: {
			name,
			email,
		},
	});

	return NextResponse.json(new_customer);
};
