const mc = require("mongodb").MongoClient;

var dbo; // to hold database object
var usersCollectionObj;
var venuesCollectionObj;
var bookingsCollectionObj;

//database name in mongoatlas cloud;
var _dbName = "mydb";

//database url
var dbUrl =
  "mongodb+srv://kumarsanga:kumarsanga@cluster0-qgkup.mongodb.net/test?retryWrites=true&w=majority";

function initDb() {
  mc.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.log("Error While connecting to db!", err);
      } else {
        console.log("connected to db...!");
        dbo = client.db(_dbName);
        usersCollectionObj = dbo.collection("usercollection");
        venuesCollectionObj = dbo.collection("venuecollection");
        bookingsCollectionObj = dbo.collection("bookingcollection");
      }
    }
  );
}

//dunction to get dn objcet
function getDb() {
  if (dbo == undefined) {
    console.log("db is not being initialized in a while!");
  }

  return {
    userCollectionObj: usersCollectionObj,
    venueCollectionObj: venuesCollectionObj,
    bookingsCollectionObj: bookingsCollectionObj,
  };
}

//exports two functions
module.exports = {
  getDb,
  initDb,
};
