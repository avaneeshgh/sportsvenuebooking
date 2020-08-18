//middleware to check valid token on the backend

// function verifyToken(req,res,next){
//   //console.log("verify token working")
//   if(!req.headers.authorization)
//   {
//       return res.status(401).send('Unauthorized request')
//   }
//   let token = req.headers.authorization.split(' ')[1];
//   if(token == 'null')
//   {
//       return res.status(401).send('Unauthorized request')
//   }
//   let payload = jwt.verify(token , 'secretKey')
//   if(!payload)
//   {
//       return res.status(401).send('Unauthorized request')
//   }
//   req.userId = payload.subject;
//   uname = payload.subject;
//   //console.log("payload :",payload.subject)
//   next()
// }

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // if (token == "null") {
    //   return res.status(401).send("Unauthorized request");
    // }

    const payload = jwt.verify(token, "secretkey");

    if (!payload) {
      return res.status(401).send("Unauthorized request");
    }

    req.body.onReloadUserID = payload.user_id;

    console.log("token successfully verified!");
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication of admin failed" });
  }
};
