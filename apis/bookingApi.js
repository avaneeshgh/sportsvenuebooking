const exp = require("express");
const router = exp.Router();
var ObjectId = require("mongodb").ObjectId;

const verifyToken = require("./verifyToken");

//stripe
const stripe = require("stripe")(
  "sk_test_51HFkHCBFTKV0ZzilwdLhNrfoyBVVoV0Svwcu9aMENIB1ueih32hSnFdrykJFH9fDfAZY7sa8JNbzso9cvVZda8bl00lxggu7DL"
);

router.post("/checkSlotsAvailable", verifyToken, (req, res, next) => {
  const checkDetails = req.body;

  req.app.locals.bookingsCollectionObj
    .find({
      selectedDate: checkDetails.selectedDate,
      venueID: checkDetails.venueID,
    })
    .toArray((err, bookingsonthatday) => {
      if (err) {
        console.log("Please Try again Lateer", err);
        return res.status(401).json({ message: "some error occured" });
      }

      console.log("stage 2", bookingsonthatday);
      let slotsAvailable = {
        slot1: true,
        slot2: true,
        slot3: true,
        slot4: true,
      };

      for (let i of bookingsonthatday) {
        if (i.status == "active") {
          if (i.timeSlot == 71) {
            slotsAvailable.slot1 = false;
          } else if (i.timeSlot == 11) {
            slotsAvailable.slot2 = false;
          } else if (i.timeSlot == 14) {
            slotsAvailable.slot3 = false;
          } else {
            slotsAvailable.slot4 = false;
          }
        }
      }

      res
        .status(200)
        .json({ message: "success", slotsAvailable: slotsAvailable });
    });
});

//creating session stripe
router.post("/checkout-session/:venueID", verifyToken, (req, res, next) => {
  const venueID = new ObjectId(req.params.venueID);
  const userID = req.body.onReloadUserID;
  console.log("user id", userID);

  var venueCollectionObj = req.app.locals.venuesCollectionObj;
  var usercollectionObj = req.app.locals.usersCollectionObj;

  venueCollectionObj.findOne({ _id: venueID }, (venueerr, venueObj) => {
    if (venueerr) {
      console.log("Error while creating checkoutsession");
      res.status(401).json({ message: "Error while configuring payment." });
    } else if (venueObj == null || venueObj == undefined) {
      console.log("Error while creating checkoutsession");
      res.status(401).json({ message: "Invalid venue details" });
    } else {
      usercollectionObj.findOne(
        { _id: new ObjectId(userID) },
        (usererr, userobj) => {
          if (usererr) {
            console.log("Error while creating checkoutsession");
            res
              .status(401)
              .json({ message: "Error while configuring payment." });
          } else if (userobj == null || userobj == undefined) {
            console.log("Error while creating checkoutsession");
            res.status(401).json({ message: "Invalid user details" });
          } else {
            //create checkout session
            stripe.checkout.sessions.create(
              {
                payment_method_types: ["card"],
                success_url: `${req.protocol}://${req.get("host")}/`,
                cancel_url: `${req.protocol}://${req.get("host")}/findvenues/${
                  req.params.venueID
                }`,
                customer_email: userobj.email,
                client_reference_id: req.params.venueID,
                line_items: [
                  {
                    name: venueObj.name,
                    description: "Play win Learn",
                    images: [],
                    amount: 1500, //venueObj.price
                    currency: "INR",
                    quantity: 1,
                  },
                ],
              },
              (sesserr, session) => {
                if (sesserr) {
                  console.log("Error while creating sessioon", sesserr);
                  res.send("Error while creating a session");
                } else {
                  res.status(200).json({ status: "success", session: session });
                }
              }
            );
          }
        }
      );
    }
  });
});

router.post("/stripe-webhook", (req, res, next) => {
  console.log("stripe webhook ", req.body);

  res.send(200).json({ message: "success" });
});

module.exports = router;
