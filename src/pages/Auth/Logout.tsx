import React, { useEffect } from "react";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { useLogout } from "../../hooks/useLogout";

const Logout: React.FC = () => {
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

const LogoutPage = withAuthRedirect(Logout);
export default LogoutPage;
