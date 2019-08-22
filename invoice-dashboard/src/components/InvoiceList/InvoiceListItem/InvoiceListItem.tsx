import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { ListItem, Grid, Hidden, Menu, MenuItem } from "@material-ui/core";

import ItemActionButton from "./styled-components/ItemActionButton";
import GridContainer from "./styled-components/GridContainer";
import { Invoice } from "../../../models/invoice.model";

interface Props {
	invoice: Invoice;
	handleViewInvoice(event: React.MouseEvent<HTMLButtonElement>): void;
	handleEditInvoice(event: React.MouseEvent<HTMLButtonElement>): void;
	handleDeleteInvoice(event: React.MouseEvent<HTMLButtonElement>): void;
}

const InvoiceListItem = (props: Props) => {
	const { sender, recipient, dueDate } = props.invoice;
	const { handleViewInvoice, handleEditInvoice, handleDeleteInvoice } = props;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
		event.preventDefault();
		setAnchorEl(null);
	};
	return (
		<ListItem>
			<GridContainer container={true} spacing={3}>
				<Grid item={true} xs={5} sm={3} md={3}>
					<span>{sender.name}</span>
				</Grid>
				<Grid item={true} xs={5} sm={3} md={3}>
					<span>{recipient.name}</span>
				</Grid>
				<Hidden only="xs">
					<Grid item={true} sm={3} md={3}>
						<span>{dueDate}</span>
					</Grid>

					<Grid item={true} sm={1} md={1}>
						<ItemActionButton onClick={handleEditInvoice}>
							<EditIcon />
						</ItemActionButton>
					</Grid>
					<Grid item={true} sm={1} md={1}>
						<ItemActionButton onClick={handleViewInvoice}>
							<VisibilityIcon />
						</ItemActionButton>
					</Grid>
					<Grid item={true} sm={1} md={1}>
						<ItemActionButton onClick={handleDeleteInvoice}>
							<DeleteIcon />
						</ItemActionButton>
					</Grid>
				</Hidden>
				<Hidden smUp={true}>
					<ItemActionButton
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleClick}
					>
						<MoreHorizIcon />
					</ItemActionButton>
					<Menu
						id="invoice-action-menu"
						anchorEl={anchorEl}
						keepMounted={true}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>Edit</MenuItem>
						<MenuItem onClick={handleClose}>Delete</MenuItem>
					</Menu>
				</Hidden>
			</GridContainer>
		</ListItem>
	);
};

export default InvoiceListItem;
