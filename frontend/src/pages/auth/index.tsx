import Login from "@login/components/Login";
import { isAuthenticated } from "@utils/auth";
import { GetServerSideProps, NextPage } from "next";


const AuthPage: NextPage = () => {
    return <Login />
};

export default AuthPage;