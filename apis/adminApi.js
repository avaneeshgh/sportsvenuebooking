//bharadwaj

const exp = require("express");
const router = exp.Router();

// router.get("/:id", (req, res, next) => {
//   if (dbo === "undefined") {
//     dbo.initDb();
//   }

//   const userID = new ObjectId(req.params.id);

//   const userCollectionObj = dbo.getDb().userCollectionObj;

//   userCollectionObj.findOne({ _id: userID }, (err, result) => {
//     if (err) {
//       console.log("some error while getting user", err);
//       res.status(401).json({ message: "error!" });
//     } else {
//       res.status(200).send({ message: "success", userData: result });
//     }
//   });
// });

router.get("/viewbookings", (req, res, next) => {
  req.app.locals.bookingsCollectionObj.find().toArray((err, result) => {
    if (err) {
      console.log("some error ocuured while getting bookings");
      return res.status(401).json({ messsage: "Bookins cant be found" });
    } else {
      res.status(200).json({ message: "success", bookings: result });
    }
  });
});

module.exports = router;
