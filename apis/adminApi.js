//bharadwaj

const exp = require("express");
const router = exp.Router();

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
