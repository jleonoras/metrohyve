import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (request, response, next) => {
  //this will check if a token is existing in the Authorization Header
  // const token = request.header("Authorization");
  const token = request.cookies.accessToken;

  if (!token) {
    return response.status(403).json({ message: "Authorization denied!" });
  }
  try {
    //this will take the token from the Authorization header then will use
    //jwt.verify function to process it
    // jwt.verify(token.slice(7), process.env.jwtSecret, (error, user) => {
    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return response.status(403).json(error.message);
      }
      request.user = user;
      next();
    });
  } catch (error) {
    console.error(error.message);
    response.status(401).json({ message: "Invalid token!" });
  }
};

export { auth };
