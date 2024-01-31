import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    let token = jwt.sign(
        { _id: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "130m"
        }
    );
    return token;
}
