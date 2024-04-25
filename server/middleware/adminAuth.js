const jwt = require("jsonwebtoken");


const CheckAdminAuth = async (req, res, next) => {
    
  try {
    const { AdminToken } = req.cookies;
    // console.log(AdminToken);

    if (!AdminToken) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Access!" });
    }

    const decoded = await jwt.verify(AdminToken, process.env.SECRET_KEY);
    req.userId = decoded._id;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized Access!" });
  }
};

module.exports = { CheckAdminAuth };
