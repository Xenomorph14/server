const Status = require("./app/models/status")

module.exports = async (req, res) => {
    try{
        Status.find({},(err, status) => {
            status.forEach(element => {
                if (element.timeStart !== null && element.timeEnd !== null && element.timeStart !== "" && element.timeEnd !== "" ) {
                    Status.findByIdAndUpdate(element._id, {
                        statusDay : 0
                    }, (err, status) => {
                        if(err){
                            res.json({data : {status : " Something wrong"}})
                        }
                    })
                }
            });
            if(!err) {
                res.json({data : "done"})
            }
        })
    }catch(err){
        if(err){
            res.json({data : {status : "Something wrong"}})
        }
    }
}