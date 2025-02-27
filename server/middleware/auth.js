const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied" }); // No token
  }

  try {
    console.log("Authorization header:", token); // Debugging log

    // Remove the 'Bearer ' prefix and verify the token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_KEY);

    console.log("Decoded token:", decoded); // Log the decoded token

    req.user = decoded; // Attach the decoded user ID to the request
    next();
  } catch (error) {
    console.error("Error decoding token:", error); // Log error
    res.status(400).json({ message: "Invalid token" }); // Invalid token
  }
};

module.exports = authMiddleware;