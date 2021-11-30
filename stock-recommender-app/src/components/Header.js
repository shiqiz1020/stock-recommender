// App title
// Tab 1: Main page
// Tab 2: Shopping cart

// Tinna

import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


export default function Header() {
  return (
    <AppBar sx={{ boxShadow: 2 }} >
      <Toolbar style={{ justifyContent: "center" }}>
        <nav>
          <Button
            color='primary'
            style={{ marginRight: 200 }}
            component={Link}
            to='/'
          >
            <Box component='div' sx={{ color: 'white', fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto' }}>
              Main
            </Box>
          </Button>
          <Button
            color='primary'
            style={{ marginRight: 50 }}
            component={Link}
            to='/shopping-cart'
          >
            <Box sx={{ color: 'white', fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto' }}>
              Shopping Cart
            </Box>
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
