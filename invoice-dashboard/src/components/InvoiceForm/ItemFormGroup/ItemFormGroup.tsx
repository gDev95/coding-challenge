import React from "react";
import { TextField, Grid } from "@material-ui/core";

import { InvoiceItem } from "../../../models/invoice.model";

interface Props {
	item: InvoiceItem;
	disabled?: boolean;
	handleChange(
		name: keyof InvoiceItem
	): (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ItemFormGroup = (props: Props) => {
	const { item, handleChange, disabled } = props;
	return (
		<Grid container={true} spacing={3}>
			<Grid item={true} xs={12} sm={3} md={3}>
				<TextField
					id="outlined-description"
					label="Description"
					value={item.description}
					onChange={handleChange("description")}
					margin="normal"
					variant="outlined"
					disabled={disabled}
				/>
			</Grid>
			<Grid item={true} xs={12} sm={3} md={3}>
				<TextField
					id="outlined-quanity"
					label="Quantity"
					value={item.qty}
					onChange={handleChange("qty")}
					margin="normal"
					variant="outlined"
					disabled={disabled}
				/>
			</Grid>
			<Grid item={true} xs={12} sm={3} md={3}>
				<TextField
					id="outlined-unitPriceNet"
					label="Unit Net Price"
					value={item.unitPriceNet}
					onChange={handleChange("unitPriceNet")}
					margin="normal"
					variant="outlined"
					disabled={disabled}
				/>
			</Grid>
			<Grid item={true} xs={12} sm={3} md={3}>
				<TextField
					id="outlined-taxRate"
					label="Tax Rate"
					value={item.taxRate}
					onChange={handleChange("taxRate")}
					margin="normal"
					variant="outlined"
					disabled={disabled}
				/>
			</Grid>
		</Grid>
	);
};

export default ItemFormGroup;
