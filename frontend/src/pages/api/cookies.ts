import cookie from "cookie"
import type { NextApiHandler } from "next";

const session: NextApiHandler = async (req, res) => {
    const parsed = cookie.parse(req.headers.cookie ?? "");

    if (parsed.token) {
        res.status(200).json({
            token: parsed.token
        });
    } else {
        res.status(401).json({ message: "Unauthorized Test" + parsed.token });
    }
    
};

export default session;
