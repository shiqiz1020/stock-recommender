// Key, Jerry

import { useState, useEffect } from "react";
// import

import Stock from "./Stock";
import Input from "./Input";

import Button from "@mui/material/Button";

const math = require("mathjs");
const finnhub = require("finnhub");

// input: a list of stocks abbreviations filtered by
// api: list of stocks + other criteria to query -> list of stock object
// pass in stock information to Stock.js
// pass in a sent-to-cart function to Stock.js
// for loop display all stocks

function StockContainer(props) {
  var lowerVolatility = 0;
  var higherVolatility = 400;
  var lowerQuality = 0;
  var higherQuality = 3000;

  // list of symbols (string)
  const [stockList, setStockList] = useState(() => {
    const savedStockList = localStorage.getItem("stockList");
    if (savedStockList) {
      console.log(JSON.parse(savedStockList));
      return JSON.parse(savedStockList);
    } else {
      return [];
    }
  });

  // list of quality ranges (string)
  const [quality, setQuality] = useState(() => {
    const savedQuality = localStorage.getItem("quality");
    if (savedQuality) {
      return savedQuality;
    } else {
      return "0-3000";
    }
  });

  // list of volatility ranges (string)
  const [volatility, setVolatility] = useState(() => {
    const savedVolatility = localStorage.getItem("volatility");
    if (savedVolatility) {
      return savedVolatility;
    } else {
      return "0-400";
    }
  });

  const [fullStockInfoList, setFullStockInfoList] = useState([]);

  const [queryChanged, setQueryChanged] = useState(false);

  function sleep(ms) {
    console.log("sleeping");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    lowerQuality = parseInt(quality.split("-")[0]);
    higherQuality = parseInt(quality.split("-")[1]);
    var tempStockInfoList = fullStockInfoList.filter(
      (stock) => stock.quality >= lowerQuality && stock.quality <= higherQuality
    );
    // console.log("tempStockInfoList", tempStockInfoList);
    if (queryChanged) {
        props.setStockInfoList(tempStockInfoList);
        localStorage.setItem("stockInfoList", JSON.stringify(tempStockInfoList));
        setQueryChanged(false);
    }
    
    // console.log("reset local storage stockInfoList: quality change:", quality);
  }, [quality]);

  useEffect(() => {
    lowerVolatility = parseInt(volatility.split("-")[0]);
    higherVolatility = parseInt(volatility.split("-")[1]);
    var tempStockInfoList = fullStockInfoList.filter(
      (stock) =>
        stock.volatility >= lowerVolatility &&
        stock.volatility <= higherVolatility
    );
    // console.log("tempStockInfoList", tempStockInfoList);
    if (queryChanged) {
        props.setStockInfoList(tempStockInfoList);
        // console.log("reset local storage stockInfoList: volatility change:", volatility)
        localStorage.setItem("stockInfoList", JSON.stringify(tempStockInfoList));
        setQueryChanged(false);
    }
    
  }, [volatility]);

  useEffect(() => {
      var tempStockInfoList = fullStockInfoList.filter(
          (stock) => 
            stock.volatility >= lowerVolatility &&
            stock.volatility <= higherVolatility &&
            stock.quality >= lowerQuality && stock.quality <= higherQuality
      );
      console.log("tempStockInfoList:", tempStockInfoList);
      if (queryChanged) {
        props.setStockInfoList(tempStockInfoList);
        localStorage.setItem("stockInfoList", JSON.stringify(tempStockInfoList));
        setQueryChanged(false);
      }
      

  }, [fullStockInfoList])

  useEffect(() => {
    async function fetchAPI() {
      const api_key = finnhub.ApiClient.instance.authentications["api_key"];
      var keys = [
        "c6g23k2ad3id0r6gcmc0",
        "c6hgfmqad3ifd92p6v20",
        "c6hgfr2ad3ifd92p6v5g",
        "c6hgh62ad3ifd92p6vp0",
      ];
      var apikey_idx = Date.now() % 4;
      api_key.apiKey = keys[apikey_idx];
      const finnhubClient = new finnhub.DefaultApi();
      var tempStockInfoList = [];
      var stockSymbol;
      for (var i = 0; i < Math.min(10, stockList.length); i++) {
        // await sleep(5000);
        stockSymbol = stockList[i];
        finnhubClient.recommendationTrends(
          stockSymbol,
          (error, data, response) => {
            // console.log("data:", data);
            if (data && data.length > 0) {
              var recentEntry = data[0];
              var historicalEntries = data.slice(0, 10);
              var historicalQualities = [];
              for (var j = 0; j < historicalEntries.length; j++) {
                var entry = historicalEntries[j];

                var historicalQuality =
                  entry["strongBuy"] * 100 +
                  entry["buy"] -
                  entry["sell"] -
                  entry["strongSell"] * 100;
                historicalQualities.push(historicalQuality);
              }
              // filter by volatility
              var tempVol;
              if (historicalQualities.length === 0) {
                tempVol = 100;
              } else {
                tempVol = math.std(historicalQualities);
              }
              // Sort by quality
              var tempQua =
                recentEntry["strongBuy"] * 100 +
                recentEntry["buy"] -
                recentEntry["sell"] -
                recentEntry["strongSell"] * 100;
              var stockInfo = {
                symbol: recentEntry["symbol"],
                volatility: tempVol,
                quality: tempQua,
                info: recentEntry,
              };
              if (
                tempQua >= lowerQuality &&
                tempQua <= higherQuality &&
                tempVol >= lowerVolatility &&
                tempVol <= higherVolatility
              ) {
                tempStockInfoList.push(stockInfo);
                setFullStockInfoList(tempStockInfoList);
              }
            }
          }
        );
      }
      console.log(fullStockInfoList);
    }
    fetchAPI();
  }, [stockList]);

  return (
    <div>
      <Input
        setStockList={setStockList}
        setRecommendation={setQuality}
        setVolatility={setVolatility}
        setQueryChanged={setQueryChanged}
      />

      {props.stockInfoList.map((stock) => (
        <div>
          <Stock
            symbol={stock.symbol}
            quality={stock.quality}
            volatility={stock.volatility}
            info={stock.info}
            setStarredNames={props.setStarredNames}
            starredNames={props.starredNames}
          />
        </div>
      ))}
    </div>
  );
}

export default StockContainer;
