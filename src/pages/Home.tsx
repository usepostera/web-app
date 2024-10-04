/* eslint-disable react-refresh/only-export-components */
import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";

const DashboardPage: React.FC = () => {
  return <div>DashboardPage</div>;
};

export default withAuthRedirect(DashboardPage);
