import React from "react";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Shadow, TitleMd } from "../../routers";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Divider } from "@mui/material";

export const NewOrder = () => {
  return (
    <>
      <Shadow>
        <TitleMd>New Order</TitleMd>
        <NewOrderFrom />
      </Shadow>
    </>
  );
};

export const NewOrderFrom = () => {
  return (
    <>
      <form className="my-8 flex flex-col gap-8">
        <div className="flex w-1/2">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Order For<span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select">
              <Option>Dinner</Option>
              <Option>Dinner</Option>
              <Option>Take AWay</Option>
            </Select>
            {/* <Input placeholder="1" type="number" size="lg" className="py-3" /> */}
          </div>
        </div>
        <div className="flex  w-1/2">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Select Timing <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Select label="Select">
              <Option>Dinner</Option>
              <Option>Dinner</Option>
              <Option>Take AWay</Option>
            </Select>
          </div>
        </div>

        <NewOrderTable />
        <Divider />
        <div className="flex w-1/2">
          <h3 className="text-primary capitalize font-medium flex w-64">Date-Time</h3>
          <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "MobileDateTimePicker", "DesktopDateTimePicker", "StaticDateTimePicker"]}>
                <MobileDateTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex w-1/2">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Attendant <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input placeholder="Admin" disabled type="number" size="lg" className="py-3" />
          </div>
        </div>
        <div className="flex w-1/2">
          <h3 className="text-primary capitalize font-medium flex w-64">
            Sub Total <span className="text-red-500 ml-2">*</span>
          </h3>
          <div className="w-full">
            <Input placeholder="Admin" disabled type="number" size="lg" className="py-3" />
          </div>
        </div>

        <div className="flex gap-5">
          <Button color="indigo" size="lg">
            Submit
          </Button>
          <Button color="green" size="lg">
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export const NewOrderTable = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <>
      <h1 className="text-lg text-primary font-semibold">
        Orders <span className="text-red-500">*</span>
      </h1>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Choose Item</StyledTableCell>
              <StyledTableCell align="right">Notes</StyledTableCell>
              <StyledTableCell align="right">Quantity </StyledTableCell>
              <StyledTableCell align="right"> Unit Price </StyledTableCell>
              <StyledTableCell align="right"> Total Price </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>1</StyledTableCell>
              <StyledTableCell align="right"> alories </StyledTableCell>
              <StyledTableCell align="right">20</StyledTableCell>
              <StyledTableCell align="right">50</StyledTableCell>
              <StyledTableCell align="right">1000</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>1</StyledTableCell>
              <StyledTableCell align="right"> alories </StyledTableCell>
              <StyledTableCell align="right">20</StyledTableCell>
              <StyledTableCell align="right">50</StyledTableCell>
              <StyledTableCell align="right">1000</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>1</StyledTableCell>
              <StyledTableCell align="right"> alories </StyledTableCell>
              <StyledTableCell align="right">20</StyledTableCell>
              <StyledTableCell align="right">50</StyledTableCell>
              <StyledTableCell align="right">1000</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
