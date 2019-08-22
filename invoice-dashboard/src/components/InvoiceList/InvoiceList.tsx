import React, { useState } from "react";
import {
	List,
	ListSubheader,
	Typography,
	Divider,
	Modal
} from "@material-ui/core";

import { Invoice } from "../../models/invoice.model";
import InvoiceListItem from "./InvoiceListItem/InvoiceListItem";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import Axios from "axios";
import { BASE_URL, INVOICE_ENDPOINT } from "../../config/endpoints.config";
import InvoiceView from "../InvoiceView/InvoiceView";

interface Props {
	invoices?: Invoice[];
	handleDeleteInvoice(
		index: number
	): (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const InvoiceList = (props: Props) => {
	const { invoices, handleDeleteInvoice } = props;
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
	const [modalOpenend, setModalState] = useState<boolean>(false);
	const [invoiceViewOpenend, setInvoiceViewOpenend] = useState<boolean>(false);
	const [viewMode, setViewMode] = useState<boolean>(false);

	if (!invoices) {
		return <Typography>You have no invoices added yet!</Typography>;
	}

	const handleEditInvoice = (index: number) => (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setInvoice(invoices[index]);
		setViewMode(false);
		setModalState(true);
	};

	const handleViewInvoice = (index: number) => (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setInvoice(invoices[index]);
		setViewMode(true);
		setInvoiceViewOpenend(true);
	};

	const handleModalClosing = () => {
		setModalState(false);
	};

	const handleInvoiceViewClosing = () => {
		setInvoiceViewOpenend(false);
	};

	return (
		<div>
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						List of Invoices
					</ListSubheader>
				}
			>
				{invoices.map((invoiceItem, index) => {
					return (
						<div key={invoiceItem.id}>
							<InvoiceListItem
								handleViewInvoice={handleViewInvoice(index)}
								handleEditInvoice={handleEditInvoice(index)}
								handleDeleteInvoice={handleDeleteInvoice(index)}
								invoice={invoiceItem}
							/>
							{index < invoices.length - 1 && <Divider variant="middle" />}
						</div>
					);
				})}
			</List>
			<Modal open={modalOpenend} onClose={handleModalClosing}>
				<InvoiceForm
					disabled={viewMode}
					existingInvoice={invoice}
					onClose={handleModalClosing}
				/>
			</Modal>
			<Modal open={invoiceViewOpenend} onClose={handleInvoiceViewClosing}>
				<InvoiceView {...invoice} />
			</Modal>
		</div>
	);
};

export default InvoiceList;
