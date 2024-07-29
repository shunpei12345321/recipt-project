import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const GET = async () => {
	const customers = await prisma.customer.findMany();
	return NextResponse.json(customers);
};
