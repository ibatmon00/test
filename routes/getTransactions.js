let router = require("express").Router();
let fs = require("fs-extra");
let fetch = require("node-fetch");

router.route("/").get(async (req, res) => {
  try {
    fetch(
      "https://rest.coinapi.io/v1/trades/latest?filter_symbol_id=_BTC_USD&limit=1000",
      {
        headers: {
          "X-CoinAPI-Key": process.env.API_KEY,
        },
        method: "GET",
      }
    )
      .then((res) => res.json()
      ).then((json) => {
        let summary_price   = 0;
        let summary_amount  = 0;
        let previous_price  = 0;

        let data = [];

        json.forEach((row) => {
          

          if (previous_price) {
            let obj = {
              percentage_diff: (row.price / previous_price).toFixed(8) - 1,
              previous_price: previous_price,
              price: row.price,
              amount: row.size,
              date: row.time_exchange,
            };
            data.push(obj);
          }
          previous_price = row.price;
          console.log();
        });

        fs.outputFile("data/transactions.json", JSON.stringify(json), (err) => {
          if (err) {
            throw err;
          } else {
            console.log("Transactions Data has been saved.");
          }
        });

        fs.outputFile("data/percentages.json", JSON.stringify(data), (err) => {
          if (err) {
            throw err;
          } else {
            console.log("Percentage Data data has been saved.");
          }
        });

        let percentages = fs.readFileSync('data/percentages.json');
        let results = JSON.parse(percentages);
        results.forEach((row) => {
          summary_price   += row.price;
          summary_amount  += row.amount;
        });

        res.json({
          total_record : json.length,
          average_price : summary_price / results.length,
          average_amount : summary_amount / results.length,
        });

      });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
