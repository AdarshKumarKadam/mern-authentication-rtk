const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

const generateToken = (res, payload) => {
  // Generate a JWT token using the payload and a secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Set the JWT token in an HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true, // The cookie is accessible only by the web server
    maxAge: 1 * 24 * 60 * 60 * 1000, // The cookie will expire in 1 day
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'none', // Allow cross-site cookie setting
  });

  console.log("Token set to cookie");

  return token; // Return the generated token
};

module.exports = generateToken; // Export the generateToken function
