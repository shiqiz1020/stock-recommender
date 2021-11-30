## Team Members: ##
Tinna Liu(3035729670), Brian Zheng (3035909408), Shiqi Zhang (3035916454), Konjac Huang (3033739258), Jerry Pan (3035788732)

## Functionality: ##
As early adults, most of us seek to equip ourselves with financial knowledge. Our simple web app uses information from some external APIs to recommend stocks to users based on their personalized needs. 

## External API (Robinhood API) ##
- We query databases from the real-time US stock market in Robinhood exchange and filter the equities based on users’ input preferences.
- Documentation
    - https://finnhub.io/docs/api/recommendation-trends
        - This API provides the stock trend recommendation on whether to buy or sell, and serves as a solid guide of stock quality trend and volatility.
    - https://finance.yahoo.com/lookup
        - This yahoo finance API provides external resources and information in webpage to present for users. Our application thus better serves as a central dashboard for selecting stocks.
- Limitations
Due to the API limit 30 calls per second, the displayed stocks are limited to 30. If users could pay the money, then we can opt into the premium version of unlimited number of stocks. Ahahaha come on man, pay money!

## Structure ##

#### Header.js ####
The header is located on the top of the frontend page, with routers to the main page (for stock search and recommendations) and the shopping cart (for displaying more detailed information for saved stocks).

#### Input.js ####
The input field is located on the main page, right below the header bar. It has input fields Sector, Recommendation, and Volatility, which are used to filter the list of stocks based on the user's individual need. Sector is the sector of the stock, recommendation is a score that we computed based on experts’ opinion (fetched from API) on each stock, and volatility is computed from the historical trend of each stock.

#### Stock.js ####
Stock is the most basic component of this project. Each component represents one single stock. Each stock has its corresponding attributes. In the Stock.js file, it also allows the user to to click on it and add it to the shopping cart.

#### StockContainer.js ####
StockContainer is the main component to 1) filter and query stocks based on user inputs using Finnhub, an external API ; 2) process and display individual recommended stock on the main page with a star/unstar functionality to save favorite stocks in the shopping cart. Each stock is passed into Stock.js to properly display the relevant information with appropriate UI. The generated stock list and saved favorite stocks are saved in localStorage for future retrieval. 

#### ShoppingCart.js ####
ShoppingCart is a page to display all starred stocks in the main page. It can be accessed by clicking “shopping cart” in the header. Beside displaying each stock’s symbol, we also provide a link to the stock’s detailed information, and another link to the stock’s recommendation of whether to buy or not by financial institutions. 

## What We’ve Learned ##
During the process of building our webapp, we consolidated our understanding of Javascript, CSS, and React. In particular, since we all worked on our own files at first, we learned how to integrate each one’s own file with other files with the use of various state variables and React hooks. During the integration process, we encountered multiple difficulties along the way. With the possibility of writing different styles of React, like functional components or class components, we run into issues with passing in props and states. 

We also learned how to incorporate information from external APIs to our project. Initially, we intended to use Robinhood API to retrieve all past histories and exchange information to provide more relevant information that is critical for user’s decision-making. However, we are unable to authenticate and require the Robinhood library. As a result, we researched and determined to use Finnhub as our external API. We managed to deal with API calling endpoints. Since the Finnhub API has a calling rate limit, we had to try various approaches to get around this issue, including trying to pause the program during execution, and limiting the number of our queries. 
