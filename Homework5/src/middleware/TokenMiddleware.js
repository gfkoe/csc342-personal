const crypto = require("crypto");
const base64url = require("base64url");
const TOKEN_COOKIE_NAME = "Token";
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever
const API_SECRET = "60d0954e20eaa0c02b382171c33c53bc18522cc6d4805eaa02e182b0";

const header = {
  alg: "HS256",
  type: "JWT",
};

const encodedHeader = base64url(JSON.stringify(header));

function generateToken(user) {
  const data = {
    user: user,
    // Use the exp registered claim to expire token in 1 hour
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const encodedData = base64url(JSON.stringify(data));

  const signature = crypto
    .createHmac("sha256", API_SECRET)
    .update(encodedHeader + "." + encodedData)
    .digest("base64url");

  return encodedHeader + "." + encodedData + "." + signature;
}

function verifyToken(token) {
  const [encodedHeader, encodedData, signature] = token.split(".");
  const expected = crypto
    .createHmac("sha256", API_SECRET)
    .update(encodedHeader + "." + encodedData)
    .digest("base64url");

  if (signature != expected) {
    throw new Error("Signature is invalid");
  }

  const data = JSON.parse(base64url.decode(encodedData));
  if (data.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token is expired");
  }

  return data;
}

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  let token = null;
  if (!req.cookies[TOKEN_COOKIE_NAME]) {
    //No cookie, so let's check Authorization header
    const authHeader = req.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1];
    }
  } else {
    //We do have a cookie with a token
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if (!token) {
    // If we don't have a token
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  //If we've made it this far, we have a token. We need to validate it

  try {
    const decoded = verifyToken(token);
    req.user = decoded.user;
    next(); //Make sure we call the next middleware
  } catch (err) {
    //Token is invalid
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
};

exports.generateToken = (req, res, user) => {
  const token = generateToken(user);

  //send token in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000, //This session expires in 2 minutes.. but token expires in 1 hour!
  });
};

exports.removeToken = (req, res) => {
  //send session ID in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000, //A date in the past
  });
};
