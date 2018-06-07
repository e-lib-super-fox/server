var jwt = require("jsonwebtoken");
function auth(req, res, next) {
  let header = req.headers["authorization"];

  if (typeof decoded !== undefined) {
    const compare = header.split(" ");

    const token = compare[1];
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role === "admin") {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
}
module.exports = {
  auth
};
