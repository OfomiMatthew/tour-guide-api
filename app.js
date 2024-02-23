const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 6000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/devData/data/tours.json`)
);

app.get("/api/v1/tours/", (req, res) => {
  res.json({ status: "success", data: { tours } });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
