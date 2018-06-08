var jwt = require("jsonwebtoken");
function verifyTokenMiddleware(req, res, next) {
  let header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const compare = header.split(" ");

    const token = compare[0];

    let decoded = undefined;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    req.user = decoded;

    return next();
  } else {
    res.status(403).json({ message: "Forbidden " });
  }
}

function auth(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden " });
  }
}

module.exports = {
  verifyTokenMiddleware,
  auth
};
