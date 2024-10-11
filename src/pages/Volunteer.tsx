import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";

const Volunteer: React.FC = () => {
  return <div></div>;
};

const VolunteerPage = withAuthRedirect(Volunteer);
export default VolunteerPage;
