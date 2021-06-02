const Status = require("../models/status")
const { distance } = require("../utils/findDistance")
const express = require("express")
const { changeTimeToFloat } = require("../utils/handleTime")
const router = express.Router()

const moment = require("moment")

router.post("/:id",  (req,res) => {
        let id = req.params.id;
        const location =  JSON.parse(Object.keys(req.body)[0]);

        const lat = Number(location.lat)
        const lon = Number( location.lon)
        const distanceNow = Math.round(
          distance(lat, lon, 20.963528714717416, 105.81668138811938)
        );
        Status.findById(id, (err,status)=>{
            if (err){
                console.log("Không tìm thấy id!");
                return res.redirect("/")
            }
  
            var newTimePoint = moment().local().format("HH:mm:ss");
            // newTimePoint = newTimePoint.toString();
            // let newDate = date.getDay() + date.getMonth() + date.getFullYear;

            // let hours = date.getHours();
            // let minutes = date.getMinutes();
            // let seconds = date.getSeconds();
            // if (hours < 10) {
            // hours = `0${hours}`;
            // }
            // if (minutes < 10) {
            // minutes = `0${minutes}`;
            // }
            // if (seconds < 10) {
            // seconds = `0${seconds}`;
            // }
            // let  newTimePoint = `${hours}:${minutes}:${seconds}`;

            // lưu status ngày hiện tại vào time line
           if (distanceNow < 1000) {
            Status.findById(id, function (err, time){
                if (err){
                    res.end()
                    return console.log("Add status data to Table fail!");
                }
                if (time.timeLine.length === 0){
                    Status.findByIdAndUpdate(
                        id,
                        {
                            timeStart : newTimePoint,
                        },
                        ( err, status ) => {
                            if (err){
                                res.end()
                                return console.log("Lỗi update time start");
                            }   
                            console.log("update time start success");
                        }
                    )
                } else  if (time.timeLine.length >= 1) {
                    Status.findByIdAndUpdate(
                        id,
                        {
                            timeEnd: newTimePoint,
                        },
                        ( err, status ) => {
                            if (err){
                                res.end()
                                return console.log("Lỗi update time end");
                            }   
                            console.log("update time end success");
                        }
                    )
                    }
                        var handleTime = changeTimeToFloat(time.timeEnd, newTimePoint)
                        console.log(handleTime)
                        if (handleTime  > 0.083) {
                            Status.findByIdAndUpdate(id,{
                                timeEnd : newTimePoint
                            } , (err, status) => {
                              if (status) {
                                  res.json({data : { status : "Check in complete" }})
                              }
                            })
                            time.timeLine.push([newTimePoint, distanceNow]);
                            time.save();
                        }else{
                            res.json({ data : {status : "Try after 5 minutes"} }) 
                        }
            })

           }else{
               res.json({data : {
                   status : "You are far from company"
               }})
           }
        }
        )
 
})

module.exports = router;

