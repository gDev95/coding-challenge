import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIcon from "@material-ui/icons/ArrowForwardIos";

import PaginationControlsContainer from "./styled-components/PaginationControlsContainer";

interface Props {
	pageSize: number;
	pageNumber: number;
	maxPage: number;
	updatePageSize(pageSize: number): void;
	handleNextPageClick(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void;
	handlePreviousPageClick(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void;
}

const PaginationControls = (props: Props) => {
	const {
		pageSize,
		pageNumber,
		maxPage,
		handleNextPageClick,
		handlePreviousPageClick,
		updatePageSize
	} = props;

	const [pageSizeValue, setPageSizeValue] = useState<string>(
		pageSize.toString()
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setPageSizeValue(newValue);
		!isNaN(parseInt(newValue)) && updatePageSize(parseInt(newValue));
	};
	return (
		<PaginationControlsContainer>
			<TextField
				id="page-size"
				label="Page Size"
				value={pageSizeValue}
				onChange={handleChange}
				margin="normal"
			/>
			<TextField
				disabled={true}
				id="page-number"
				label="Page Number"
				value={pageNumber}
				margin="normal"
			/>
			<Button disabled={pageNumber === 1} onClick={handlePreviousPageClick}>
				<ArrowBackIcon />
			</Button>
			<Button disabled={pageNumber === maxPage} onClick={handleNextPageClick}>
				<ArrowForwardIcon />
			</Button>
		</PaginationControlsContainer>
	);
};

export default PaginationControls;
