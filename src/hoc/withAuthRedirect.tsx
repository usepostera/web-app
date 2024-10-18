import { ComponentType, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Navigate, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { logout } from "../store/authSlice";
import { setRedirectAfterLogin } from "../store/appSlice";

// HOC that checks if user is authenticated, redirects if not
function withAuthRedirect<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWithAuthRedirect = (props: T) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(
      (state) => state.auth.isAuthenticated
    );
    const redirectAfterLogin = useAppSelector(
      (state) => state.app.redirectAfterLogin
    );

    const { isConnected, isConnecting } = useAccount();

    useEffect(() => {
      if (!isConnected && !isConnecting && isAuthenticated) {
        dispatch(logout());
      }
    }, [dispatch, isAuthenticated, isConnected, isConnecting]);

    if (!isAuthenticated) {
      if (pathname !== "/") {
        dispatch(setRedirectAfterLogin(pathname));
      }
      return <Navigate to="/login" />;
    }

    if (redirectAfterLogin) {
      const path = `${redirectAfterLogin}`;
      dispatch(setRedirectAfterLogin(null));
      return <Navigate to={path} />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthRedirect;
}

export default withAuthRedirect;
