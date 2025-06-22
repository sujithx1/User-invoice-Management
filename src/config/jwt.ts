import { Request, Response } from "express";
import { JwtParameter_type, StatusCode } from "../types/types";
import jwt, { JwtPayload } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecrect = process.env.JWT_REFRESH_SECRET!;
export const generateAcceToken = (payload: JwtParameter_type) => {
  return jwt.sign(payload, accessSecret, { expiresIn: "2h" });
};
export const generateRefreshToken = (payload: JwtParameter_type) => {
  return jwt.sign(payload, refreshSecrect, { expiresIn: "7d" });
};

export const generatenewAccessToken = (req: Request, res: Response) => {
  const {role} = req.params
  const userRole = `${role}_refreshToken`;
  const refreshToken = req.cookies[userRole];
  if (!refreshToken) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: "Refresh Token not found" });
  }

  jwt.verify(
    refreshToken,
    refreshSecrect,
    (err: jwt.VerifyErrors | null, decode: JwtPayload | string | undefined) => {
      if (err || !decode) {
        return res
          .status(StatusCode.FORBIDDEN)
          .json({ message: "Invalid Refresh Token" });
      }
      const user = decode as JwtParameter_type;
      console.log(user);
      
      const newAccessToken = generateAcceToken(user);

      return res.json({ accessToken: newAccessToken });
    }
  );
};
