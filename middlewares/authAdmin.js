import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send("missing token, sign in first");
    try {
        let user = jwt.verify(token, process.env.JWT_SECRET);
        if (user.role == "admin") {
            req.uuser = user;
            next();
        }
        else {
            return res.status(403).send("You are not authorized");
        }
    }
    catch {
        return res.status(401).send("token is not authorized");
    }
};
