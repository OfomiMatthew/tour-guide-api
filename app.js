const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

// middlewares
app.use(express.json()); // access to the request body

app.use(morgan("combined"));

app.use((req, res, next) => {
  console.log("middleware activated");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const PORT = 6000;

// route handlers
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/devData/data/tours.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.json({ status: "success", results: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.json({
      status: "fail",
      message: "no ID detected",
    });
  }
  const tour = tours.find((item) => item.id === id);
  res.json({ data: tour });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({ message: "no Id found" });
  } else {
    res.send("data updated");
  }
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(204).json({ message: "no Id found" });
  } else {
    res.send("data deleted");
  }
};

const getAllUsers = (req,res)=>{
  res.status(500).json({
    status:'error',
    message:"no route yet"
  })
}

const getUser = (req,res)=>{
  res.status(500).json({
    status:'error',
    message:"no route yet"
  })
}

const createUser = (req,res)=>{
res.status(500).json({
  status:"error",
  message:"no route yet"
})
}

const updateUser = (req,res)=>{
  res.status(500).json({
    status:"error",
    message:"no route yet"
  })
  }

const deleteUser = (req,res)=>{
    res.status(500).json({
      status:"error",
      message:"no route yet"
    })
    }

// routes
// endpoints for tours

app.use('api/v1/tours',tourRouter)

const tourRouter = express.Router()

app.get("/api/v1/tours/:id", getTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

tourRouter
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  // endpoints for users
app.route("/api/v1/users/").get(getAllUsers).post(createUser);
app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
