const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return res.send("Please login to access this route").status(401);

  const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  req.userId = decodedData._id;
  next();
};
module.exports=isAuthenticated;
