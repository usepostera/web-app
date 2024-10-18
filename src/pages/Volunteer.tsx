import React, { useCallback } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import VolunteerEventList from "../components/VolunteerEventList";
import { useVolunteerEvents } from "../hooks/useVolunteerEvents";
import { useNavigate, useParams } from "react-router-dom";
import VolunteerEventDetail from "../components/VolunteerEventDetail";
import GoBack from "../components/GoBack";

const Volunteer: React.FC = () => {
  const navigate = useNavigate();
  const controller = useVolunteerEvents();

  const { id } = useParams();

  const onSelect = useCallback(
    (id: string) => {
      navigate(`/volunteer/${id}`);
    },
    [navigate]
  );

  return (
    <div className="p-4 md:!p-8 flex flex-col md:!flex-row gap-8">
      <div className="flex-1 md:max-w-[400px]">
        <div className="mt-4">
          {id && (
            <div className="my-2">
              <GoBack />
            </div>
          )}

          <VolunteerEventList
            data={controller}
            onSelect={onSelect}
            selected={id}
          />
        </div>
      </div>

      <div className="flex-1">{id && <VolunteerEventDetail id={id} />}</div>
    </div>
  );
};

const VolunteerPage = withAuthRedirect(Volunteer);
export default VolunteerPage;
