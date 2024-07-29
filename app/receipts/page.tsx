import Link from "next/link";

export default function ReceiptDetails() {
	// const [receipts, setReceipts] = useState<Receipt[]>([]);
	// const router = useRouter();
	// const { customer_id } = router.query;

	return (
		<div>
			<h1>Receipts for Customer ID</h1>
			{/* {receipts.map((receipt) => (
				<div key={receipt.receipt_id}>
					<h2>Receipt ID: {receipt.receipt_id}</h2>
					<p>Date: {receipt.receipt_date}</p>
					<Link href="/">[ホームに戻る]</Link>
				</div>
			))} */}
			<Link href="/">[ホームに戻る]</Link>
		</div>
	);
}
