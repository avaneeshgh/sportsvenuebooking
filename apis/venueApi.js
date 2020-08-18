const exp = require("express");
const router = exp.Router();
var ObjectId = require("mongodb").ObjectId;


router.get("/:location/:sporttype", (req, res) => {
  req.params.location = req.params.location.split(":")[1];
  req.params.sporttype = req.params.sporttype.split(":")[1];

  // console.log(req.params);
  var venueCollectionObj = req.app.locals.venuesCollectionObj
  venueCollectionObj
    .find(
      { location: req.params.location,sporttype: req.params.sporttype }
    )
    .toArray((err, result) => {
      if (err) {
        console.log("Error occured during list-of-venues", err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
});

router.get("/:id", (req, res, next) => {
  const venueID = new ObjectId(req.params.id);

  req.app.locals.venuesCollectionObj.findOne({ _id: venueID }, (err, result) => {
    if (err) {
      console.log("some error while getting venue", err);
      res.status(401).json({ message: "error!" });
    } else {
      //console.log("success", result);
      res.status(200).send({ message: "success", venueData: result });
    }
  });
});

router.get("/:location/:sporttype/:id", (req, res) => {
  //console.log(req.params.id);
  var venueCollectionObj = dbo.getDb().venuesCollectionObj;
  var id = req.params.id;
  var o_id = new ObjectId(id);
  venueCollectionObj.findOne({ _id: o_id }, (err, venueObj) => {
    if (err) {
      console.log("error occured while retrieving venue info:", err);
    } else if (venueObj === null) {
      res.send({ message: "Such venueId Does not exist in the Database!" });
    } else {
      console.log(venueObj);
      res.send(venueObj);
    }
  });
});

module.exports = router;