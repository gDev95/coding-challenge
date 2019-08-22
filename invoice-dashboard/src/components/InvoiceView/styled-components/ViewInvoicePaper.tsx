import styled from "styled-components";
import { Paper } from "@material-ui/core";

const ViewInvoicePaper = styled(Paper)`
	position: relative;
	min-width: 200px;
	max-width: 800px;
	min-height: 400px;
	max-height: 800px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin: auto;
	margin-top: 30px;
	margin-bottom: 30px;
	padding: 30px;
	overflow-y: scroll !important;
`;

export default ViewInvoicePaper;
