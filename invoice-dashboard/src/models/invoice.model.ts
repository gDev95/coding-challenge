export interface Person {
	name: string;
	email: string;
	address1: string;
	address2: string;
	address3: string;
	vatId: string;
}

export interface InvoiceItem {
	description: string;
	qty: number;
	unitPriceNet: number;
	taxRate: number;
}

export interface Invoice {
	id: string;
	createdAt: string;
	dueDate: string;
	sender: Person;
	recipient: Person;
	items: InvoiceItem[];
}
