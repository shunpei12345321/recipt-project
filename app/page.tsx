"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Customer } from "@prisma/client";
// import { useRouter } from "next/router";

Link;

// ここのtypeは別フォルダーに入れて　インポートさせる

export default function Home() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// const router = useRouter();

	// const [reload, setReload] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	const fetchCustomer = async () => {
	// 		setIsLoading(true);
	// 		{
	// 			const res = await fetch("/api/customer/");
	// 			const customers = await res.json();
	// 			setCustomers(customers);
	// 		}
	// 		setIsLoading(false);
	// 	};
	// 	fetchCustomer();
	// }, [reload]);

	// const handleReload = () => {
	// 	setReload(!reload);
	// };

	const addCustomer = async () => {
		const res = await fetch("/api/customer", {
			method: "POST",
			// headers: {
			// 	"Content-Type": "application/json",
			// },
			body: JSON.stringify({ name, email }),
		});
		const newCustomer = await res.json();
		setCustomers([...customers, newCustomer]);
	};

	// const viewReceipts = (customer_id: number) => {
	// router.push(`/receipts/${customer_id}`);

	return (
		<div>
			<div className="flex justify-between  mb-5">
				<p className="text-center  pr-3 mr-3 font-bold text-5xl">111</p>

				{/* {isLoading ? (
					<p>Reloading...</p>
				) : (
					<button
						onClick={handleReload}
						type="button"
						className="bg-blue-500 text-white px-2 py-1">
						Reload
					</button>
				)} 
				 ---------------  //ここはルーターのところ  --------------------
				 */}
			</div>
			<h1>Customers</h1>
			<ul>
				{customers.map((customer) => (
					<li key={customer.customer_id}>
						{customer.name} ({customer.email})
						{/* <button onClick={() => viewReceipts(customer.customer_id)}>
							View Receipts
						</button> */}
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
