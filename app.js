const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = 6000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/devData/data/tours.json`)
);

// endpoint to get all tours
app.get("/api/v1/tours/", (req, res) => {
  res.json({ status: "success", results: tours.length, data: { tours } });
});

// endpoint to create new tours
app.post("/api/v1/tours", (req, res) => {
const newId = tours[tours.length-1].id +1
const newTour = Object.assign({id:newId},req.body)
tours.push(newTour)
fs.writeFile(`${__dirname}/devData/data/tours.json`,JSON.stringify(tours),(err)=>{
res.status(201).json({
  status:"success",
  data:{
    tour:newTour
  }
})
})


});


app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
