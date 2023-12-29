import { getUser } from "../utils/auth.js";

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers, cookies, or wherever it's stored
  const token =
    req.headers.authorization ||
    req.cookies.token ||
    req.body.token ||
    req.query.token;

  const trim = token.split(" ")[1];
  console.log("token revievd from client is", trim);
  // Verify the token using the getUser function
  const user = getUser(trim);

  // If the user is authenticated, attach the user object to the request
  if (user) {
    req.user = user;
    next();
  } else {
    // If the token is invalid or not present, send a 401 Unauthorized response
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { authMiddleware };
