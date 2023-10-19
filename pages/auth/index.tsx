import { NextPage } from "next";
import dynamic from "next/dynamic";

const AuthPage = dynamic(() => import("components/Auth/Auth"), {
  ssr: false,
});

const Auth: NextPage = () => {
  return <AuthPage></AuthPage>;
};

export default Auth;
