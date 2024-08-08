import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface ReqProps extends Request {
  user?: any;
}

const validateToken = async (
  req: ReqProps,
  res: Response,
  next: NextFunction
) => {
  let token;
  let authHeader = req.headers.authorization || req.header("Authorization");
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (error: any, decoded: any) => {
        if (error) {
          console.log("Jwt authentication error: ", error.toString());
          return res.status(401).json({
            statusId: 0,
            status: "Authentication Error",
            error: error.toString(),
          });
        }
        req.user = decoded.user;
        next();
      }
    );
    if (!token) {
      return res
        .status(404)
        .json({ statusId: 0, status: "Token was not provide" });
    }
  }
};

export default validateToken;
