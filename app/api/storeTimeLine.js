const Status = require("../models/status");
const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  let id = req.params.id;
  Status.findById(id, (err, status) => {
    if( status !== undefined) {
        res.json({ data: status.timeLine });
    }
  });
});

module.exports = router;
