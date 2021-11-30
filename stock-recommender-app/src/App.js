import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import * as React from 'react';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import Input from "./components/Input";
import StockContainer from "./components/StockContainer";
import ShoppingCart from "./components/ShoppingCart";
import Header from "./components/Header";



function App() {

  // localStorage.clear();
  const [stockInfoList, setStockInfoList] = React.useState(() => {
    const savedStockInfoList = localStorage.getItem("stockInfoList");
    console.log("savedStockInfoList:", savedStockInfoList);
    if (savedStockInfoList) {
      console.log("parsedStockInfoList:", JSON.parse(savedStockInfoList));
      return JSON.parse(savedStockInfoList);
    } else {
      return [];
    }
  });

  const [starredNames, setStarredNames] = React.useState(() => {
    const savedStarredNames = localStorage.getItem("starredNames");
    if (savedStarredNames) {
      return JSON.parse(savedStarredNames);
    } else {
      return [];
    }
  });

  return (
    <Router>
      <Stack spacing={12}>
        <Header />
        <Grid
          container
          direction="column"
          spacing={0}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Routes>
              <Route exactly element={<StockContainer stockInfoList={stockInfoList} setStockInfoList={setStockInfoList} starredNames={starredNames} setStarredNames={setStarredNames} />} path="/" />
              <Route exactly element={<ShoppingCart names={starredNames} setNames={setStarredNames}/>}  path="/shopping-cart" />
            </Routes>
          </Grid>
        </Grid>
      </Stack>
    </Router>
  );
}

export default App;
