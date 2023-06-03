import Cookies from "js-cookie";
import type { NextApiHandler } from "next";

const session: NextApiHandler = async (req, res) => {
    const token = Cookies.get("token");

    if (token) {
        res.status(200).json({
            token
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default session;
