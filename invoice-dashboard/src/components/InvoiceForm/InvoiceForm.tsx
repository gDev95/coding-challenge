import React, { useEffect } from "react";
import { Typography, IconButton } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

import FormSubmitButton from "./styled-components/FormSubmitButton";
import DueDateFormGroup from "./DueDateFormGroup/DueDateFormGroup";
import InvoiceFormPaper from "./styled-components/InvoiceFormPaper";
import PersonFormGroup from "./PersonFormGroup/PersonFormGroup";
import { Invoice, InvoiceItem, Person } from "../../models/invoice.model";
import ItemFormGroup from "./ItemFormGroup/ItemFormGroup";
import ModalCloseButton from "./styled-components/ModalCloseButton";

interface Props {
	existingInvoice?: Invoice;
	disabled?: boolean;
	onClose(): void;
}

const InvoiceForm = (props: Props) => {
	const { existingInvoice, disabled, onClose } = props;

	const [invoice, setInvoice] = React.useState<Invoice>({
		id: "",
		dueDate: "",
		createdAt: "",
		sender: {
			name: "",
			email: "",
			vatId: "",
			address1: "",
			address2: "",
			address3: ""
		},
		recipient: {
			name: "",
			email: "",
			vatId: "",
			address1: "",
			address2: "",
			address3: ""
		},
		items: []
	});

	useEffect(() => {
		if (existingInvoice) {
			setInvoice(existingInvoice);
		}
	}, [existingInvoice]);

	const handleSenderChange = (name: keyof Person) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setInvoice({
			...invoice,
			sender: { ...invoice.sender, [name]: event.target.value }
		});
	};

	const handleRecipientChange = (name: keyof Person) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setInvoice({
			...invoice,
			recipient: { ...invoice.recipient, [name]: event.target.value }
		});
	};

	const handleItemChange = (index: number) => (name: keyof InvoiceItem) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setInvoice({
			...invoice,
			items: invoice.items.map((item: InvoiceItem, i) => {
				if (i === index) {
					return { ...item, [name]: event.target.value };
				} else {
					return item;
				}
			})
		});
	};

	const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInvoice({ ...invoice, dueDate: event.target.value });
	};

	const addNewItem = () => {
		const newItem: InvoiceItem = {
			description: "",
			qty: 0,
			unitPriceNet: 0,
			taxRate: 0
		};
		setInvoice({ ...invoice, items: [...invoice.items, newItem] });
	};

	const deleteItem = () => {
		if (invoice.items.length <= 0) {
			return;
		} else if (invoice.items.length === 1) {
			setInvoice({ ...invoice, items: [] });
			return;
		}

		const lastIndex = invoice.items.length - 1;
		const itemsAfterRemovedItem = invoice.items.splice(lastIndex, 1);
		setInvoice({ ...invoice, items: [...itemsAfterRemovedItem] });
	};

	const validateValues = () => {
		console.log();
	};

	const submitForm = () => {
		validateValues();
	};

	return (
		<InvoiceFormPaper>
			<Typography variant="h4">Invoice Form</Typography>
			<ModalCloseButton onClick={onClose}>
				<CloseIcon />
			</ModalCloseButton>
			<form noValidate={true} autoComplete="off">
				<Typography variant="h6">Due Date</Typography>
				<DueDateFormGroup
					disabled={disabled}
					dueDate={invoice.dueDate}
					handleChange={handleDueDateChange}
				/>
				<Typography variant="h6">Sender</Typography>
				<PersonFormGroup
					disabled={disabled}
					person={invoice.sender}
					handleChange={handleSenderChange}
				/>
				<Typography variant="h6">Recipient</Typography>
				<PersonFormGroup
					disabled={disabled}
					person={invoice.recipient}
					handleChange={handleRecipientChange}
				/>
				<Typography variant="h6">Items</Typography>
				{invoice.items.map((item: InvoiceItem, index: number) => {
					return (
						<ItemFormGroup
							key={item.description}
							item={item}
							disabled={disabled}
							handleChange={handleItemChange(index)}
						/>
					);
				})}
				<IconButton disabled={disabled} onClick={addNewItem}>
					<AddIcon />
				</IconButton>
				<IconButton disabled={disabled} onClick={deleteItem}>
					<DeleteIcon />
				</IconButton>
			</form>
			<FormSubmitButton
				variant="contained"
				color="primary"
				disabled={disabled}
				onClick={submitForm}
			>
				Add new Invoice
			</FormSubmitButton>
		</InvoiceFormPaper>
	);
};

export default InvoiceForm;
