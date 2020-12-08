## Backend test
Using the NodeJS runtime, create an app and write JS code using the most up to date ES specifications.
Code must be efficient and easy to read. Most importantly write reusable and elegant code.

### Query the Coin API - https://docs.coinapi.io/
Using their public API, retrieve the transactions of USD/BTC over the last 1000 events and extract the following information:
  - The average price for that period
  - The average trade size for that period

The retrieved and extracted data must be stored locally in a json file for further computation, saving compressed with gz is a plus.

### Going further - Filter the data
Running a simplistic point algorithm, filter out the price data to get an overall trend with a percentage comparaison between start and end.
Store the filtered points in a different json file locally.
