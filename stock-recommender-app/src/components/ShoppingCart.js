//// Read the starred stocks from local Storage
//// Display all "starred" stocks as a portfolio
//// Display charts
//// Card-like grid
//
//// Brian

import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import './ShoppingCart.css';

//const names = ["FB", "AAPl", "AMZN", "GOOG", "NFLX", "MSFT"];

function generateLink2(name) {
  return (
    <Link
      href={"https://widget.finnhub.io/widgets/recommendation?symbol=" + name}
    >
      {" "}
      Link
    </Link>
  );
}

function generateLink(name) {
  return <Link href={"https://finance.yahoo.com/quote/" + name}> Link</Link>;
}

function ShoppingCart(props) {
  // const {names} = props;

  function removeStock(name) {
    const index = props.names.indexOf(name);
    var tempStarredNames = props.names.slice();
    if (index > -1) {
      tempStarredNames.splice(index, 1);
      props.setNames(tempStarredNames);
      localStorage.setItem("starredNames", JSON.stringify(tempStarredNames));
      console.log("removeStock:", tempStarredNames);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Companies</TableCell>
            <TableCell align="center">Info</TableCell>
            <TableCell align="center">Buy In Opinion</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <div>
          {props.names.length === 0 && <div align="center">Cart is empty.</div>}
        </div>
        <TableBody>
          {props.names.map((name) => (
            <TableRow key={name}>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center">{generateLink(name)}</TableCell>
              <TableCell align="center">{generateLink2(name)}</TableCell>
              <TableCell align="center">
                <input type="button" value="X" className="delete-button" onClick={()=>removeStock(name)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ShoppingCart;
