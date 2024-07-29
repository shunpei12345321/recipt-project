"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Customer } from "@prisma/client";
import { useRouter } from "next/navigation";

// ここのtypeは別フォルダーに入れて　インポートさせる

export default function Home() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const router = useRouter();

	useEffect(() => {
		fetch("/api/customer")
			.then((res) => res.json())
			.then((data) => setCustomers(data));
	}, []);

	const addCustomer = async () => {
		const res = await fetch("/api/customer", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email }),
		});
		const newCustomer = await res.json();
		setCustomers([...customers, newCustomer]);
	};

	const viewReceipts = (customer_id: number) => {
		router.push(`/receipts/${customer_id}`);
	};

	return (
		<div>
			<div className="flex justify-between  mb-5">
				<p className="text-center  pr-3 mr-3 font-bold text-5xl">111</p>
			</div>
			<h1>Customers</h1>
			<ul>
				{customers.map((customer) => (
					<li key={customer.customer_id}>
						{customer.name} ({customer.email})
						<button onClick={() => viewReceipts(customer.customer_id)}>
							View Receipts
						</button>
					</li>
				))}
			</ul>
			<h1>Name</h1>
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button onClick={addCustomer}>Add Customer</button>

			<Link
				className="px-5 py-1 border-2 rounded-lg text-green-800 border-green-700 bg-green-100"
				href="/receipts">
				新しい投稿
			</Link>
		</div>
	);
}
