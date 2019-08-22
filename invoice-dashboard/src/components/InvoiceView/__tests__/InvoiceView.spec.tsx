import React from "react";
import InvoiceView from "../InvoiceView";
import { render, getByTestId } from "@testing-library/react";

describe("InvoiceView", () => {
	const fakeInvoice = {
		id: "",
		dueDate: "",
		createdAt: "",
		sender: {
			name: "Joe Doe",
			email: "joe",
			vatId: "",
			address1: "",
			address2: "",
			address3: ""
		},
		recipient: {
			name: "Joe Doe",
			email: "joe@email.com",
			vatId: "123",
			address1: "Joe's Company",
			address2: "24 Test Street",
			address3: "10000 Berlin, Germany"
		},
		items: [
			{
				description: "Licensed Soft Fish",
				qty: 6,
				taxRate: 0.19,
				unitPriceNet: 52.32
			},
			{
				description: "Something other than Soft Fish",
				qty: 1,
				taxRate: 0.59,
				unitPriceNet: 20
			}
		]
	};

	it("should display the information of the invoice recipient", () => {
		const { container } = render(<InvoiceView {...fakeInvoice} />);

		const name = getByTestId(container, "recipientName");
		const address1 = getByTestId(container, "recipientAddress1");
		const address2 = getByTestId(container, "recipientAddress2");
		const address3 = getByTestId(container, "recipientAddress3");

		expect(name.textContent).toBe("Joe Doe");
		expect(address1.textContent).toBe("Joe's Company");
		expect(address2.textContent).toBe("24 Test Street");
		expect(address3.textContent).toBe("10000 Berlin, Germany");
	});

	it("should display the items information", () => {
		const { container } = render(<InvoiceView {...fakeInvoice} />);
		const { description, unitPriceNet, taxRate, qty } = fakeInvoice.items[0];

		const itemDescription = getByTestId(container, "itemDescription0");
		const itemQuantity = getByTestId(container, "itemQty0");
		const unitPrice = getByTestId(container, "itemUnitPrice0");
		const totalBeforeTax = getByTestId(container, "itemTotalBeforeTax0");
		const totalAfterTax = getByTestId(container, "itemTotalAfterTax0");

		const unitPriceWithTax = unitPriceNet + taxRate;
		const totalAmountBeforeTax = unitPriceNet * qty;
		const totalAmountAfterTax = unitPriceWithTax * qty;

		expect(itemDescription.textContent).toBe(description);
		expect(itemQuantity.textContent).toBe(qty.toString());
		expect(unitPrice.textContent).toBe(unitPriceNet.toString());
		expect(totalBeforeTax.textContent).toBe(totalAmountBeforeTax.toString());
		expect(totalAfterTax.textContent).toBe(totalAmountAfterTax.toString());
	});

	it("should display the invoice total (with and without Taxes)", () => {
		const { container } = render(<InvoiceView {...fakeInvoice} />);

		const invoiceTotalBeforeTaxEl = getByTestId(
			container,
			"invoiceTotalBeforeTax"
		);
		const invoiceTotalAfterTaxEl = getByTestId(
			container,
			"invoiceTotalAfterTax"
		);

		const itemOne = fakeInvoice.items[0];
		const itemOneUnitPriceWithTax = itemOne.unitPriceNet + itemOne.taxRate;
		const itemOneTotalAmountBeforeTax = itemOne.unitPriceNet * itemOne.qty;
		const itemOneTotalAmountAfterTax = itemOneUnitPriceWithTax * itemOne.qty;

		const itemTwo = fakeInvoice.items[1];
		const itemTwoUnitPriceWithTax = itemTwo.unitPriceNet + itemTwo.taxRate;
		const itemTwoTotalAmountBeforeTax = itemTwo.unitPriceNet * itemTwo.qty;
		const itemTwoTotalAmountAfterTax = itemTwoUnitPriceWithTax * itemTwo.qty;

		const invoiceTotalBeforeTax = (
			itemOneTotalAmountBeforeTax + itemTwoTotalAmountBeforeTax
		).toFixed(2);
		const invoiceTotalAfterTax = (
			itemOneTotalAmountAfterTax + itemTwoTotalAmountAfterTax
		).toFixed(2);

		expect(invoiceTotalBeforeTaxEl.textContent).toBe(
			"Total Before Tax :" + invoiceTotalAfterTax.toString()
		);
		expect(invoiceTotalAfterTaxEl.textContent).toBe(
			"Total After Tax :" + invoiceTotalAfterTax.toString()
		);
	});
});
