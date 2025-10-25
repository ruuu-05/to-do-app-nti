const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  console.log("Authorization header:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

    //Extract raw token if it starts with "Bearer "
  const rawToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;


  try {
    const decoded = jwt.verify(rawToken, "secretkey");
    console.log("Decoded token:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticate;
