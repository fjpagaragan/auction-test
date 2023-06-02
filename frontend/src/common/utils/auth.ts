import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const isAuthenticated = (): boolean => {
    const token = Cookies.get("token");

    if (token) {
        try {
            const decodeToken: any = jwt.decode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodeToken.exp < currentTime) {
                return false;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    return false;
}