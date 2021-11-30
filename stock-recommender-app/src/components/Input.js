// Input.js: input fields for query criteria

// - volatility
// - sector
// - budget
// - tag

// Tinna

import React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import sp500 from "../resource/sp500.json";

function Input(props) {

  // sp500 company list is stored in variable sp500

  var selectedComps = [];
  // var selectedRecommendation = "";
  // var selectedVolatility = "";
  var sectors = sp500.map(comp => comp.Sector);
  sectors = [...new Set(sectors)].sort();
  // const volatilities = ["0-49", "50-99", "100-149", "150-199", "200+"];
  // const recommendation = ["0-499", "500-999", "1000-1499", "1500-1999", "2000-2499", "2500+"];
  const volatilities = ["0-100", "101-200", "200-300"];
  const recommendation = ["0-1300", "1301-2500", "2500-4000"];

  var quality = localStorage.getItem("quality");
  var volatility = localStorage.getItem("volatility");
  var sector = localStorage.getItem("sector");


  // const handleSubmit = (event) => {
  //   selectedComps.sort((c1, c2) => {
  //       if (c1.Symbol <= c2.Symbol) {
  //           return -1;
  //       } else {
  //           return 1;
  //       }
  //   })
  //   localStorage.setItem("stocks", JSON.stringify(selectedComps)); // all stocks within the selected sector
  //   // localStorage.setItem("query", JSON.stringify({"recommendations": {selectedRecommendation}, "volatilities": {selectedVolatility}}))
  //   // props.setQuery({"recommendations": selectedRecommendation, "volatilities": selectedVolatility});
  // }

  return (
    <div className="SearchBar">
      <Box
        component="form"
        sx={{
          m: 2,
        }}
        // onSubmit={(event) => handleSubmit(event)}
      >
        <Grid
          container
          columnSpacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sx={{ width: 300}}>
            <Autocomplete
              value={sector}
              disablePortal
              // freeSolo
              id="combo-box-demo"
              options={sectors}
              onChange={(event, value) => {
                selectedComps = sp500.filter(comp => comp.Sector === value);
                let stockSymbols = selectedComps.map(comp => comp.Symbol);
                console.log(stockSymbols);
                props.setStockList(stockSymbols);
                props.setQueryChanged(true);
                localStorage.setItem("stockList", JSON.stringify(stockSymbols));
                localStorage.setItem("sector", value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Sector" />
              )}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <Autocomplete
              value={quality}
              disablePortal
              // freeSolo
              id="combo-box-demo"
              options={recommendation}
              onChange={(event, value) => {
                // selectedRecommendation = value;
                props.setRecommendation(value);
                props.setQueryChanged(true);
                localStorage.setItem("quality", value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Recommendation" />
              )}
            />
          </Grid>

          <Grid item sx={{ width: 200 }}>
            <Autocomplete
              value={volatility}
              disablePortal
              // freeSolo
              id="combo-box-demo"
              options={volatilities}
              onChange={(event, value) => {
                // selectedVolatility = value;
                props.setVolatility(value);
                props.setQueryChanged(true);
                localStorage.setItem("volatility", value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Volatility" />
              )}
            />
          </Grid>

          {/* <Grid item>
            <Button type="submit" variant="contained" sx={{ height: 53 }}>
              Submit
            </Button>
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}

export default Input;
