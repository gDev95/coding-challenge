import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, AppBar, Typography, Button, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import InvoiceList from "../InvoiceList/InvoiceList";
import { Invoice } from "../../models/invoice.model";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import PaginationControls from "../PaginationControls/PaginationControls";
import InvoiceListContainer from "./styled-components/InvoiceListContainer";
import StyledToolbar from "./styled-components/StyledToolbar";
import { BASE_URL, INVOICE_ENDPOINT } from "../../config/endpoints.config";

interface PaginationState {
	pageSize: number;
	pageNumber: number;
	maxPageNumber: number;
}

const Dashboard = () => {
	const [pagination, setPaginationValues] = useState<PaginationState>({
		pageSize: 10,
		pageNumber: 1,
		maxPageNumber: 1
	});
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const [modalOpenend, setModalState] = useState<boolean>(false);

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const params = {
					page_size: pagination.pageSize,
					page_number: pagination.pageNumber
				};
				const config = { params };
				const response = await axios.get(BASE_URL + INVOICE_ENDPOINT, config);
				const newInvoices = response.data.invoices;
				const newMaxPageNumber = response.data.meta.totalPages;
				setInvoices(newInvoices);
				setPaginationValues({ ...pagination, maxPageNumber: newMaxPageNumber });
			} catch (e) {
				console.error(e);
			}
		};
		fetchInvoices();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination.pageNumber, pagination.pageSize]);

	const handlePageSizeChange = (pageSize: number): void => {
		setPaginationValues({ ...pagination, pageSize });
	};

	const handleNextPage = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
		setPaginationValues({ ...pagination, pageNumber: ++pagination.pageNumber });
	};

	const handlePreviousPage = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
		setPaginationValues({ ...pagination, pageNumber: --pagination.pageNumber });
	};

	const handleModalOpening = () => {
		setModalState(true);
	};

	const handleModalClosing = () => {
		setModalState(false);
	};

	const handleDeleteInvoice = (index: number) => (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const deleteInvoice = async () => {
			try {
				const id = invoices[index].id;
				const data = {
					invoice: invoices[index]
				};
				await axios.delete(`${BASE_URL}${INVOICE_ENDPOINT}/${id}`, { data });
				const newInvoices = [...invoices];
				newInvoices.splice(index, 1);
				setInvoices(newInvoices);
			} catch (e) {
				console.error(e.message);
			}
		};
		deleteInvoice();
	};

	return (
		<div>
			<AppBar position="static" color="default">
				<StyledToolbar>
					<Typography data-testid="appBarHeader" variant="h6" color="inherit">
						Invoices
					</Typography>
					<Button color="inherit" onClick={handleModalOpening}>
						<AddIcon /> Add Invoice
					</Button>
				</StyledToolbar>
			</AppBar>
			<InvoiceListContainer>
				<Paper>
					<InvoiceList
						invoices={invoices}
						handleDeleteInvoice={handleDeleteInvoice}
					/>

					<PaginationControls
						pageNumber={pagination.pageNumber}
						pageSize={pagination.pageSize}
						maxPage={pagination.maxPageNumber}
						handleNextPageClick={handleNextPage}
						handlePreviousPageClick={handlePreviousPage}
						updatePageSize={handlePageSizeChange}
					/>
				</Paper>
			</InvoiceListContainer>
			<Modal open={modalOpenend} onClose={handleModalClosing}>
				<InvoiceForm onClose={handleModalClosing} />
			</Modal>
		</div>
	);
};

export default Dashboard;
