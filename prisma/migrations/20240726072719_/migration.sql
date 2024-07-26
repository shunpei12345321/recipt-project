-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "receipt_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "receipt_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("receipt_id")
);

-- CreateTable
CREATE TABLE "ReceiptDetail" (
    "detail_id" SERIAL NOT NULL,
    "receipt_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ReceiptDetail_pkey" PRIMARY KEY ("detail_id")
);

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptDetail" ADD CONSTRAINT "ReceiptDetail_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "Receipt"("receipt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptDetail" ADD CONSTRAINT "ReceiptDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
