import { ComponentType } from "react";
import { useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";

// HOC that checks if user is authenticated, redirects if not
function withAuthRedirect<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWithAuthRedirect = (props: T) => {
    const isAuthenticated = useAppSelector(
      (state) => state.auth.isAuthenticated
    );

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthRedirect;
}

export default withAuthRedirect;
