import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environment";

export const createToken = (userId: string): string => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not available")
    }
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d"});
};
