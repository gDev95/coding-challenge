import React, { useState, useEffect } from "react";
import { Invoice } from "../../models/invoice.model";
import ViewInvoicePaper from "./styled-components/ViewInvoicePaper";
import {
	Grid,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from "@material-ui/core";

interface CalculatedTotals {
	beforeTax: number;
	afterTax: number;
}

const InvoiceView = (props: Invoice) => {
	const { recipient, dueDate, id, createdAt, items } = props;

	const [itemsTotal, setItemsTotal] = useState<CalculatedTotals[]>([]);

	const [invoiceTotal, setInvoiceTotal] = useState<CalculatedTotals>({
		beforeTax: 0,
		afterTax: 0
	});

	useEffect(() => {
		const calculateItems = () => {
			const newItemsTotal: CalculatedTotals[] = [];
			items.forEach(item => {
				const itemsTotalBeforeTax = item.qty * item.unitPriceNet;
				const unitPriceWithTaxes = item.unitPriceNet + item.taxRate;
				const itemsTotalAfterTax = item.qty * unitPriceWithTaxes;
				const newItemTotal = {
					beforeTax: itemsTotalBeforeTax,
					afterTax: itemsTotalAfterTax
				};

				newItemsTotal.push(newItemTotal);
			});

			setItemsTotal(newItemsTotal);
		};

		calculateItems();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const calculateInvoice = () => {
			let newTotal: CalculatedTotals = { beforeTax: 0, afterTax: 0 };

			itemsTotal.forEach(itemTotal => {
				newTotal = invoiceTotal;
				newTotal.beforeTax += itemTotal.beforeTax;
				newTotal.afterTax += itemTotal.afterTax;
			});

			setInvoiceTotal(newTotal);
		};

		calculateInvoice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemsTotal]);
	return (
		<ViewInvoicePaper>
			<Grid container={true} spacing={3}>
				<Grid
					container={true}
					item={true}
					xs={6}
					sm={6}
					md={6}
					direction="column"
					justify="center"
					alignItems="flex-start"
				>
					<span>Recipient</span>
					<span data-testid="recipientName">{recipient.name}</span>
					<span data-testid="recipientAddress1">{recipient.address1}</span>
					<span data-testid="recipientAddress2">{recipient.address2}</span>
					<span data-testid="recipientAddress3">{recipient.address3}</span>
				</Grid>
				<Grid
					container={true}
					item={true}
					xs={6}
					sm={6}
					md={6}
					direction="column"
					justify="center"
					alignItems="flex-start"
				>
					<span data-testid="invoiceId">ID: {id}</span>
					<span data-testid="createdAt">Date: {createdAt}</span>
					<span data-testid="dueDate">DueDate: {dueDate}</span>
				</Grid>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Description</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Unit Price</TableCell>
							<TableCell align="right">Total Amount before Taxes</TableCell>
							<TableCell align="right">Total Amount after Taxes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((item, index) => (
							<TableRow key={index}>
								<TableCell
									data-testid={`itemDescription${index}`}
									component="th"
									scope="row"
								>
									{item.description}
								</TableCell>
								<TableCell data-testid={`itemQty${index}`} align="right">
									{item.qty}
								</TableCell>
								<TableCell data-testid={`itemUnitPrice${index}`} align="right">
									{item.unitPriceNet}
								</TableCell>
								<TableCell
									data-testid={`itemTotalBeforeTax${index}`}
									align="right"
								>
									{itemsTotal[index] && itemsTotal[index].beforeTax.toFixed(2)}
								</TableCell>
								<TableCell
									data-testid={`itemTotalAfterTax${index}`}
									align="right"
								>
									{itemsTotal[index] && itemsTotal[index].afterTax.toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Grid
					container={true}
					item={true}
					xs={12}
					sm={12}
					md={12}
					direction="column"
					justify="center"
					alignItems="flex-end"
				>
					<span data-testid="invoiceTotalBeforeTax">
						{console.log(invoiceTotal)}
						{`Total Before Tax : ${invoiceTotal.beforeTax}`}
					</span>
					<span data-testid="invoiceTotalAfterTax">
						Total After Tax : {invoiceTotal.afterTax}
					</span>
				</Grid>
				<Grid />
			</Grid>
		</ViewInvoicePaper>
	);
};

export default InvoiceView;
