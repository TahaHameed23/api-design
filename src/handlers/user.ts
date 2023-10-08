import primsa from "../db";
import { comparePswd, createJWT, hashPswd } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
    try {
        const user = await primsa.user.create({
            data: {
                username: req.body.username,
                password: await hashPswd(req.body.password),
            },
        });
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        err.type = "input";
        next(err);
    }
};

export const signIn = async (req, res) => {
    const user = await primsa.user.findUnique({
        where: {
            username: req.body.username,
        },
    });

    const isValid = await comparePswd(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.json({ message: "Wrong pswd" });
    }

    res.json("Logged in");
};
