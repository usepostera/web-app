import React from "react";
import withAuthProtection from "../../hoc/withAuthProtection";

const Login: React.FC = () => {
  return <div>LoginPage</div>;
};

export const LoginPage = withAuthProtection(Login);
