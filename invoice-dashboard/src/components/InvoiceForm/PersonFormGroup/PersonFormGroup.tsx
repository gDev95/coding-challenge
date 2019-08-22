import React from "react";
import { Grid, TextField } from "@material-ui/core";

import { Person } from "../../../models/invoice.model";

interface Props {
	person: Person;
	disabled?: boolean;
	handleChange(
		name: keyof Person
	): (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonFormGroup = (props: Props) => {
	const { person, handleChange, disabled } = props;
	return (
		<Grid container={true} spacing={3}>
			<Grid item={true} xs={12} sm={4} md={4}>
				<TextField
					id="outlined-name"
					label="Name"
					value={person.name}
					disabled={disabled}
					onChange={handleChange("name")}
					margin="normal"
					variant="outlined"
				/>
			</Grid>
			<Grid item={true} xs={12} sm={4} md={4}>
				<TextField
					id="outlined-email"
					label="Email"
					value={person.email}
					disabled={disabled}
					onChange={handleChange("email")}
					margin="normal"
					variant="outlined"
				/>
			</Grid>
			<Grid item={true} xs={12} sm={4} md={4}>
				<TextField
					id="outlined-vatId"
					label="VAT ID"
					value={person.vatId}
					disabled={disabled}
					onChange={handleChange("vatId")}
					margin="normal"
					variant="outlined"
				/>
			</Grid>
			<Grid item={true} xs={12} sm={4} md={4}>
				<TextField
					id="outlined-address1"
					label="Address1"
					value={person.address1}
					disabled={disabled}
					onChange={handleChange("address1")}
					margin="normal"
					variant="outlined"
				/>
			</Grid>
			<Grid item={true} xs={12} sm={4} md={4}>
				<TextField
					id="outlined-address2"
					label="Address2"
					value={person.address2}
					disabled={disabled}
					onChange={handleChange("address2")}
					margin="normal"
					variant="outlined"
				/>
			</Grid>
			<Grid item={true} xs={12} sm={4} md={4}>
				<TextField
					id="outlined-address3"
					label="Address3"
					value={person.address3}
					disabled={disabled}
					onChange={handleChange("address3")}
					margin="normal"
					variant="outlined"
				/>
			</Grid>
		</Grid>
	);
};

export default PersonFormGroup;
