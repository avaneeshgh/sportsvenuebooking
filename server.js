// install and import express module
const exp = require("express");
const app = exp(); // express obj
const path = require("path");
const mc = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
var bc;

//stripe
const stripe = require("stripe")(
  "sk_test_51HFkHCBFTKV0ZzilwdLhNrfoyBVVoV0Svwcu9aMENIB1ueih32hSnFdrykJFH9fDfAZY7sa8JNbzso9cvVZda8bl00lxggu7DL"
);

//connect server.js with sportsvenue app of dist folder
app.use(exp.static(path.join(__dirname, "./dist/sportsvenue")));

const _portnum = 3000 || process.env.PORT;

const bodyParser = require("body-parser"); // for the purpose of converting object into json
app.use(bodyParser.json()); //middleware for above purpose

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,PATCH,OPTIONS"
  );

  next();
});

//import UserApi and venueAPi ownerApi
const userApi = require("./apis/userApi");
const venueApi = require("./apis/venueApi");
const ownerApi = require("./apis/ownerApi");
const adminApi = require("./apis/adminApi");
const bookingApi = require("./apis/bookingApi");
const verifyToken = require("./apis/verifyToken");

mc.connect(
  "mongodb+srv://kumarsanga:kumarsanga@cluster0-qgkup.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log("Error while connecting to db!");
    } else {
      console.log("connected to db...!");
      dbo = client.db("mydb");
      app.locals.usersCollectionObj = dbo.collection("usercollection");
      app.locals.venuesCollectionObj = dbo.collection("venuecollection");
      app.locals.bookingsCollectionObj = dbo.collection("bookingcollection");
      bc = dbo.collection("bookingcollection");
      app.listen(process.env.PORT || 3000, (err) => {
        if (err) {
          const error = new Error(
            "Error while assigning a port number , please try again later"
          );
          error.status = 404;
          console.log("Error while assigning a port number");
        } else {
          console.log(`server listening on port number ${_portnum}`);
        }
      });

      //md
    }
  }
);

app.post("/onReload", verifyToken, (req, res, next) => {
  const userID = req.body.onReloadUserID;

  var usercollectionObj = req.app.locals.usersCollectionObj;

  usercollectionObj.findOne({ _id: new ObjectId(userID) }, (err, result) => {
    if (err) {
      return res.status(401).json({ message: "error invalid request" });
    }

    res.status(200).json({ message: "success", userDetails: result });
  });
});

//middleware
app.use("/users", userApi);
app.use("/findvenues", venueApi);
app.use("/owner", ownerApi);
app.use("/admin", adminApi);
app.use("/bookings", bookingApi);

app.post(
  "/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const metadata = request.body.data.object.metadata;

    const bookObj1 = {
      userID: metadata.userID,
      venueID: metadata.venueID,
      selectedDate: metadata.selectedDate,
      createdDate: metadata.createdDate,
      timeSlot: metadata.timeSlot,
      message: metadata.message,
      status: metadata.status,
    };

    bc.insertOne(bookObj1, (err, result) => {
      if (err) {
        console.log("error occured while booking");
        response.status(401).json({ message: "Booking Failed" });
      } else {
        console.log("successfully saved to database shiva ");

        response
          .status(200)
          .json({ message: "successfully Booked!", bookingID: result._id });
      }
    });
  }
);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//we can call this middleware from anywhere
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./dist/sportsvenue/index.html"));
});
