import bcrypt from "bcrypt"
import JWT from 'jsonwebtoken';


export const requireSignin = async (req, resp, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode
        next();
    } catch (error) {
        resp.json(error)
    }
}