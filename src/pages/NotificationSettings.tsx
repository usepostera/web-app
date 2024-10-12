import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";

const NotificationSettings: React.FC = () => {
  return <div className="">NotificationSettings</div>;
};

const NotificationSettingsPage = withAuthRedirect(NotificationSettings);
export default NotificationSettingsPage;
