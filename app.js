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
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/devData/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// get a tour
app.get('/api/v1/tours/:id',(req,res)=>{
  console.log(req.params)
  const id = req.params.id * 1

  if(id > tours.length){
    return res.json({
      status:"fail",
      "message":"no ID detected"
    })
  }
  const tour = tours.find(item =>
    item.id === id
  )
  res.json({data:tour})
})

// using patch to update data
app.patch('/api/v1/tours/:id',(req,res)=>{
  if(req.params.id*1 > tours.length){
    res.status(404).json({message:"no Id found"})
  }else{
    res.send("data updated")
  }

})

app.delete('/api/v1/tours/:id',(req,res)=>{
  if(req.params.id*1 > tours.length){
    res.status(204).json({message:"no Id found"})
  }else{
    res.send("data deleted")
  }

})

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
