const exp = require("express");
const router = exp.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

var ObjectId = require("mongodb").ObjectId;
const saltRounds = 10;
const verifyToken = require("./verifyToken");
const { strict } = require("assert");

//get single user

router.get("/:id", verifyToken, (req, res, next) => {
  const userID = new ObjectId(req.params.id);
  const userCollectionObj = req.app.locals.usersCollectionObj;

  userCollectionObj.findOne({ _id: userID }, (err, result) => {
    if (err) {
      console.log("some error while getting user", err);
      res.status(401).json({ message: "error!" });
    } else {
      res.status(200).send({ message: "success", userData: result });
    }
  });
});

router.post("/signup", (req, res) => {
  var usercollectionObj = req.app.locals.usersCollectionObj;
  usercollectionObj.findOne({ email: req.body.email }, (err, userObj) => {
    if (err) {
      console.log("error occured during signup form", err);
    } else if (userObj != null) {
      return res.status(401).json({ message: "Email Already Exists!" });
      res.send({ message: "Email already exists" });
    } else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.log("Error during generating salt", err);
        } else {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              console.log("error during hasing a passsword", err);
            } else {
              req.body.password = hash;

              req.body.passwordExpiresIn = "";
              req.body.passwordResetToken = "";
              usercollectionObj.insertOne(req.body, (err, result) => {
                if (err) {
                  console.log("Error occured while inseerting document", err);
                } else {
                  let transportObj = {
                    email: req.body.email,
                    message:
                      "Thank you for your interest in Sportsvenue. Now you are ready to book a venue in any city in India",
                    subject: "Welcome to the Sportsvenue!😃",
                    name: req.body.name,
                  };
                  sendEmail(transportObj, (info) => {
                    res.send({ message: "Successfully Registered" });
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

//hadle login form
router.post("/login", (req, res, next) => {
  var usercollectionObj = req.app.locals.usersCollectionObj;
  usercollectionObj.findOne({ email: req.body.email }, (err, userObj) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials!" });
    } else {
      if (userObj === null) {
        return res
          .status(401)
          .json({ message: "Invalid Authentication Credentials!" });
      } else {
        bcrypt.compare(req.body.password, userObj.password, (err, result) => {
          if (err) {
            return res
              .status(401)
              .json({ message: "Invalid Authentication Credentials!" });
          } else {
            if (result) {
              let token = jwt.sign(
                {
                  user_id: userObj._id,
                  user_email: userObj.email,
                  user_password: userObj.password,
                },
                "shivaloveskeerthiandjahnavi"
              );

              //modifytoken
              let tokenparts = token.split(".");
              let modiftoken =
                tokenparts[0] +
                "." +
                "brA4BeyQRlsTv0f24peeyJ7Gb9PnPSeysx6Z95OqO" +
                tokenparts[1] +
                "." +
                tokenparts[2];

              res.send({
                message: "success",
                signedToken: modiftoken,
                userObj: userObj,
              });
            } else {
              return res
                .status(401)
                .json({ message: "Invalid Authentication Credentials!" });
            }
          }
        });
      }
    }
  });
});

//book the slot
router.post("/bookslot", verifyToken, (req, res, next) => {
  const bookObj = req.body;

  req.app.locals.bookingsCollectionObj.insertOne(bookObj, (err, result) => {
    if (err) {
      console.log("error occured while booking");
      res.status(401).json({ message: "Booking Failed" });
    } else {
      res
        .status(200)
        .json({ message: "successfully Booked!", bookingID: result._id });
    }
  });
});

//user details editing
router.put("/editdetails", verifyToken, (req, res, next) => {
  const userObj = req.body;

  const userObj1 = {
    _id: new ObjectId(userObj._id),
    name: userObj.name,
    phone: userObj.phone,
  };

  req.app.locals.usersCollectionObj.updateOne(
    { _id: new ObjectId(userObj._id) },
    { $set: { name: userObj.name, phone: userObj.phone } },
    (err, result) => {
      if (err) {
        console.log("some error occured while updating the user", err);
        return res.status(401).json({ message: "error while updating" });
      }

      res.status(200).json({ message: "success" });
    }
  );
});

router.get("/getAllBookings/:userID", verifyToken, (req, res, next) => {
  const userID = new ObjectId(req.params.userID).toString();

  req.app.locals.bookingsCollectionObj
    .find({ userID: userID })
    .toArray((err, bookingsresult) => {
      if (err) {
        console.log("Error while getting bookings", err);
        return res.status(401).json({ message: "failed to get bookings" });
      }

      let arrayofbookings = bookingsresult;

      if (arrayofbookings.length == 0) {
        return res
          .status(200)
          .json({ message: "success", userBookings: arrayofbookings });
      }

      let c = 0;
      for (let i of arrayofbookings) {
        const venueID = new ObjectId(i.venueID);

        let time = i.timeSlot;

        if (time == 71) {
          i.timeSlot = "7 AM to 10 AM";
        } else if (time == 11) {
          i.timeSlot = "10 AM to 1 PM";
        } else if (time == 14) {
          i.timeSlot = "1 PM to 4 PM";
        } else {
          i.timeSlot = "4 PM to 7 PM";
        }

        req.app.locals.venuesCollectionObj.findOne(
          { _id: venueID },
          (err, venueresult) => {
            if (err) {
              console.log("Error while getting venue", err);
              return res.status(401).json({ message: "failed to get venue" });
            }

            i.venueDetails = venueresult;
            c++;
            if (c == arrayofbookings.length) {
              console.log("stage 3");
              res
                .status(200)
                .json({ message: "success", userBookings: arrayofbookings });
            }
          }
        );
      }
    });
});

router.patch("/cancelbooking", verifyToken, (req, res, next) => {
  const bookingID = new ObjectId(req.body.bid);

  req.app.locals.bookingsCollectionObj.updateOne(
    { _id: bookingID },
    { $set: { status: "cancelled" } },
    (err, result) => {
      if (err) {
        console.log("Error while cancelling slot", err);
        return res.status(401).json({ message: "failed to cancel booking" });
      }

      //send email of cancelling
      //Hi username
      // your booking has been cancelled
      // here is cancelled booking details
      // booking ID :
      // created Date:

      // email,subject,name,message

      res.status(200).json({ message: "success" });
    }
  );
});

router.post("/sendEmail", (req, res) => {
  var usercollectionObj = req.app.locals.usersCollectionObj;

  usercollectionObj.findOne({ email: req.body.email }, (err, userObj) => {
    if (err) {
      console.log("error occured while login", err);
      res.status(401).json({ message: "Please Try again later!" });
      message: "Please Try again later!";
    } else {
      if (userObj === null) {
        res.send({ message: "Email does not exist!" });
      } else {
        var user = userObj;
        let otp = ""; //generating random password
        for (i = 1; i <= 8; i++) {
          otp = otp + getDigit();
        }

        // Hashing the random password
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.log("Error during generating salt", err);
            res.send({ message: "Error during generating salt" });
          } else {
            bcrypt.hash(otp, salt, (err, hash) => {
              if (err) {
                console.log("error during hasing a passsword", err);
                res.send({ message: "Error during hasing a passsword" });
              } else {
                console.log(hash); //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
                //adding two more fileds

                usercollectionObj.updateOne(
                  { email: user.email },
                  { $set: { password: hash } },
                  (err, result) => {
                    if (err) {
                      console.log(
                        "Error occured while inseerting document",
                        err
                      );
                      res.send("Some error Occured ,plz try again later");
                    } else {
                      user.subject = "Reset your Sportsvenue password";
                      user.message = `Someone (hopefully you) has requested a password reset for your Sportsvenue account.So your temporary password is ${otp}`;
                      sendEmail(user, (info) => {
                        res.status(200).json({ message: "success", obj: info });
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }
    }
  });
});

function getDigit() {
  return Math.floor(Math.random() * 9 + 1);
}

async function sendEmail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sportsvenue9951@gmail.com",
      pass: "9182738937",
    },
  });

  let mailOptions = {
    from: '"Sports Venue"<sportsvenue9951@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: user.subject, // Subject line
    html: `<h1>Hello  ${user.name} . ${user.message}`,
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

router.put("/changepassword", verifyToken, (req, res, next) => {
  const passobj = req.body;

  var usercollectionObj = req.app.locals.usersCollectionObj;

  usercollectionObj.findOne({ email: req.body.email }, (err, userObj) => {
    if (err) {
      console.log("error occured while login", err);
      res.status(401).json({ message: "some error occured" });
    } else {
      if (userObj === null) {
        res.send({ message: "Email does not exist!" });
      } else {
        console.log("stage 1");

        // Hashing the random password
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.log("Error during generating salt", err);
            res.send({ message: "Error during generating salt" });
          } else {
            bcrypt.compare(
              passobj.currentpassword,
              userObj.password,
              (err, result) => {
                if (err) {
                  console.log("Please Try again Lateer", err);
                  res.status(401).json({ message: "some error occured" });
                } else {
                  if (result) {
                    // Hashing the random password
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                      if (err) {
                        console.log("Error during generating salt", err);
                        res.status(401).json({ message: "some error occured" });
                      } else {
                        bcrypt.hash(passobj.newpassword, salt, (err, hash) => {
                          if (err) {
                            console.log("error during hasing a passsword", err);
                            res
                              .status(401)
                              .json({ message: "some error occured" });
                          } else {
                            usercollectionObj.updateOne(
                              { email: userObj.email },
                              { $set: { password: hash } },
                              (err, result) => {
                                if (err) {
                                  console.log(
                                    "Error occured while inseerting document",
                                    err
                                  );
                                  res
                                    .status(401)
                                    .json({ message: "some error occured" });
                                } else {
                                  res.status(200).json({ message: "success" });
                                }
                              }
                            );
                          }
                        });
                      }
                    });
                  } else {
                    res
                      .status(401)
                      .json({ message: "current Password don't match" });
                  }
                }
              }
            );
          }
        });
      }
    }
  });
});

module.exports = router;
