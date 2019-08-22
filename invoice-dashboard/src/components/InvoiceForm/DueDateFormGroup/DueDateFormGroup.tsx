import React from "react";
import { Grid, TextField } from "@material-ui/core";

interface Props {
	dueDate: string;
	disabled?: boolean;
	handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}
const DueDateFormGroup = (props: Props) => {
	const { dueDate, handleChange, disabled } = props;
	return (
		<Grid container={true} spacing={3}>
			<Grid item={true} xs={12} sm={4} md={4}>
				<TextField
					disabled={disabled}
					id="outlined-dueDate"
					label="Due Date"
					value={dueDate}
					onChange={handleChange}
					margin="normal"
					variant="outlined"
				/>
			</Grid>
		</Grid>
	);
};

export default DueDateFormGroup;
