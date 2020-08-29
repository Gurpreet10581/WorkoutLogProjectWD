const express = require("express");
const router = express.Router();
let validateSession = require("../middleware/validate-session");
const Log = require("../db").import("../models/log");

//--------> Create

router.post("/create", validateSession,(req, res) => {
  const logFromRequest = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };

  Log.create(logFromRequest)
    .then((log) =>
      res.status(200).json({
        log: log,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//--------> Get All

router.get("/", (req, res) => {
  Log.findAll()
    .then((log) =>
      res.status(200).json({
        log: log,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//--------> Get All for signed in user
router.get('/mine',validateSession,(req, res)=>{
  let userid = req.user.id
  Log.findAll({
      where:{owner_id: userid}
  })
  .then(logs => res.status(200).json(logs))
  .catch(err => res.status(500).json({error: err}))
});

//--------> Get By ID

router.get("/:id",validateSession, (req, res) => {
  Log.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((log) =>
      res.status(200).json({
        log: log,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//--------> Update By ID

router.put("/:id", validateSession, (req, res) => {
  Log.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((log) =>
      res.status(200).json({
        log: log,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//--------> Delete By ID

router.delete('/:id', validateSession, function(req, res){
  const query = {where: {id: req.params.id, owner_id: req.user.id}};

  Log.destroy(query)
  .then(() => res.status(200).json({message: "Log Entry Removed"}))
  .catch(err => res.status(500).json({error: err}))
})

module.exports = router;
