import React, { useCallback, useState } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import VolunteerEventList from "../components/VolunteerEventList";
import { useVolunteerEvents } from "../hooks/useVolunteerEvents";
import { useNavigate, useParams } from "react-router-dom";
import VolunteerEventDetail from "../components/VolunteerEventDetail";
import GoBack from "../components/GoBack";
import Button from "../components/Button";
import RippleEffect from "../components/Ripple";
import classNames from "classnames";
import useDeviceView from "../hooks/useDeviceView";

const Volunteer: React.FC = () => {
  const navigate = useNavigate();
  const [own, setOwn] = useState(false);

  const controller = useVolunteerEvents(own);

  const { id } = useParams();
  const isMobile = useDeviceView();

  const onSelect = useCallback(
    (id: string) => {
      navigate(`/volunteer/${id}`);
    },
    [navigate]
  );

  return (
    <div className="p-4 md:!p-8 flex flex-col md:!flex-row md:gap-8">
      {isMobile && (
        <div className="my-2">
          <GoBack />
        </div>
      )}

      <div className={`flex-1  ${id ? "hidden md:block" : ""}`}>
        <div className="mt-4">
          {id && (
            <div className="my-2">
              <GoBack />
            </div>
          )}

          {!id && (
            <div className="my-2">
              <Button.Text
                label="Refresh"
                onClick={controller.reload}
                disabled={controller.loading}
              />
            </div>
          )}

          <div className="flex flex-row gap-4 mt-2 mb-4 text-[12px] leading-[14.63px]">
            <RippleEffect
              className={classNames("px-[16px] py-[11px] rounded-[40px]", {
                "border-[1px] border-[#00000080] bg-transparent text-black":
                  own,
                "bg-primary text-white": !own,
              })}
              skipDelay
              onClick={() => setOwn(false)}
            >
              <span>Events</span>
            </RippleEffect>

            <RippleEffect
              className={classNames("px-[16px] py-[11px] rounded-[40px]", {
                "border-[1px] border-[#00000080] bg-transparent text-[#00000080]":
                  !own,
                "bg-primary text-white": own,
              })}
              skipDelay
              onClick={() => setOwn(true)}
            >
              <span>My Events</span>
            </RippleEffect>
          </div>

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
