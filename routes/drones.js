const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/drones", (req, res, next) => {
  Drone.find()
  .then(drones =>{
    console.log(`Listed ${drones.length} drones from the DB`)
    res.render("drones/list", {drones})
  })
  .catch((err)=> console.log ("DB error reading '/drones"));
});

//ITERATION 3
router
  .get("/drones/create", (req, res, next) => {
    res.render("drones/create-form");
  })
  .post("/drones/create", (req, res) => {
    const name = req.body.name;
    const propellers = req.body.propellers;
    const maxSpeed = req.body.maxSpeed;
    
    Drone.create({name, propellers, maxSpeed })
    
    .then(() => res.redirect("/drones"))
    .catch((error) => `Error while creating a new drone: ${error}`);
  });


///ITERATION 4

router.get("/drones/:id/edit", (req, res, next) => {
  const id= req.params.id
    Drone.findById(id)
    .then((drone) =>{
      res.render("drones/update-form", drone);
    })
});

router.post("/drones/:id/edit", (req, res, next) => {
  const id= req.params.id;

  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.findOneAndUpdate(
    {"_id": req.params.id},
    {name, propellers, maxSpeed}
  )
  .then(()=> {
  res.redirect("/drones")
 })
});

//ITERATION 5
router.post("/drones/:id/delete", (req, res, next) => {
  const id= req.params.id;

  Drone.findByIdAndDelete(
    id
  )
  .then(deletedDrone => {
  console.log("Deleted drone: ", deletedDrone);
  res.redirect("/drones")
 });
});

module.exports = router;
