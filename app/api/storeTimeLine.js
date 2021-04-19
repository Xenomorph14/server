const Status = require("../models/status");
const express = require("express");
const router = express.Router();
const moment = require("moment");

router.get("/:id", (req, res) => {
  let id = req.params.id;
  Status.findById(id, (err, status) => {
    if( status !== undefined) {
        res.json({ data: status.timeLine });
        status.timeLine.forEach(element => {
          element.map((e) => {
            console.log(moment.utc(e[0]));
          })
        });
    }
  });
});

module.exports = router;
