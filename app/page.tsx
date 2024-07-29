"use client";
import { useEffect, useState } from "react";

interface Receipt {
	receipt_id: number;
	customer: {
		name: string;
	} | null;
	details: {
		product: {
			product_name: string;
		} | null;
		quantity: number;
	}[];
}

export default function ReceiptsPage() {
	const [receipts, setReceipts] = useState<Receipt[]>([]);
	const [newReceipt, setNewReceipt] = useState({
		customer_id: "",
		receipt_date: "",
		details: [
			{
				product_id: "",
				quantity: 1,
				total_price: 0,
			},
		],
	});

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/receipts");
			const data = await response.json();
			setReceipts(data);
		}
		fetchData();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await fetch("/api/receipts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newReceipt),
		});

		const data = await response.json();
		setReceipts((prev) => [...prev, data]);
	};

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold mb-4">Receipts</h1>
			<form onSubmit={handleSubmit} className="mb-4">
				<input
					type="text"
					placeholder="Customer ID"
					value={newReceipt.customer_id}
					onChange={(e) =>
						setNewReceipt({ ...newReceipt, customer_id: e.target.value })
					}
					className="border p-2 rounded mr-2"
				/>
				<input
					type="date"
					value={newReceipt.receipt_date}
					onChange={(e) =>
						setNewReceipt({ ...newReceipt, receipt_date: e.target.value })
					}
					className="border p-2 rounded mr-2"
				/>
				{/* 追加の詳細入力フォームをここに追加 */}
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">
					Add Receipt
				</button>
			</form>
			{receipts.map((receipt) => (
				<div key={receipt.receipt_id} className="mb-4 p-4 border rounded-lg">
					<h2 className="text-xl font-semibold">
						{receipt.customer ? receipt.customer.name : "Unknown Customer"}
					</h2>
					<ul>
						{receipt.details.map((detail, index) => (
							<li key={index} className="ml-4 list-disc">
								<span>
									{detail.product
										? detail.product.product_name
										: "Unknown Product"}{" "}
									- Quantity: {detail.quantity}
								</span>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
