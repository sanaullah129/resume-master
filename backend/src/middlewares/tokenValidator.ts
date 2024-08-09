import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


interface RequestProps extends Request {
    user?: any
}

const validateToken = (req: RequestProps, res: Response, next: NextFunction) => {
  var token;
  var authHeader = req.headers.authorization || req.header("Authorization");
  if (!token) {
    res.status(401).json({ Error: "No token found" });
  }
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          console.log("Jwt Authentication Error: " + err);
          return res.status(401).json({ Error: "Authentication Error" });
        }
        req.user = decoded.user;
        next();
      }
    );
  }
};

export default validateToken;
