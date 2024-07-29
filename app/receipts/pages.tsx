import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Receipt = {
	receipt_id: number;
	receipt_date: string;
	details: {
		product_name: string;
		quantity: number;
		total_price: number;
	}[];
};

Link;

export default function ReceiptDetails() {
	const [receipts, setReceipts] = useState<Receipt[]>([]);
	const router = useRouter();
	const { customer_id } = router.query;

	useEffect(() => {
		if (customer_id) {
			fetch(`/api/receipts/${customer_id}`)
				.then((res) => res.json())
				.then((data) => setReceipts(data));
		}
	}, [customer_id]);

	return (
		<div>
			<h1>Receipts for Customer ID: {customer_id}</h1>
			{receipts.map((receipt) => (
				<div key={receipt.receipt_id}>
					<h2>Receipt ID: {receipt.receipt_id}</h2>
					<p>Date: {receipt.receipt_date}</p>
					<ul>
						{receipt.details.map((detail, index) => (
							<li key={index}>
								{detail.product_name} - {detail.quantity} pcs - $
								{detail.total_price}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
