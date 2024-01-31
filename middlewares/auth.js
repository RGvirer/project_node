import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("missing token, sign in first")
    }
    try {
        //
        req.uuser = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).send("token is not authorized")
    }
}