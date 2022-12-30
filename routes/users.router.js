var express=require("express");
const router = express.Router();

// curl -X GET -H "Content-Type: application/json" "http://localhost:3000/v1/users?limit=2&offset=10"
router.get("/", (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  if(limit && offset){
    res.json({
      limit, offset
    })
  }else{
    res.send("there is not params")
  }
});

module.exports = router;
