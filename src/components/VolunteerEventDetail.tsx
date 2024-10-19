import React, { useEffect, useState } from "react";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { useVolunteerService } from "../services/volunteer";
import { TVolunteerEvent } from "../@types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import Loader from "./Loader";
import { baseURL } from "../lib/axiosInstance";
import CustomAvatar from "./CustomAvatar";
import CreatedAt from "./CreatedAt";
import { GrLocation } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineDirections } from "react-icons/md";
import Button from "./Button";

type Props = {
  id: string;
};

const VolunteerEventDetail: React.FC<Props> = (props) => {
  const { id } = props;
  const [event, setEvent] = useState<TVolunteerEvent | null>();
  const { getEvent } = useVolunteerService();
  const { trigger, loading } = useRequestHandler(getEvent);

  useEffect(() => {
    const run = async () => {
      const result = await trigger(id);
      if (result) {
        setEvent(result);
      }
    };

    if (id) {
      run();
    }
  }, [id, trigger]);

  if (loading || !event) {
    return <Loader size={20} />;
  }

  return (
    <div className="md:max-w-[400px] font-montserrat">
      <SimpleAnimatedComponent>
        <div className="w-full">
          <img
            src={`${baseURL}/${event.image}`}
            alt=""
            className="h-[224px] w-full object-cover rounded-[12px] mb-4"
          />

          <h4 className="text-[20px] leading-[22px] font-medium mb-1">
            {event.title}
          </h4>

          <div className="flex flex-row text-[16px] font-light leading-[22px] mb-6">
            <p className="mr-2">By</p>

            <div className="mr-1">
              <CustomAvatar radius={10} />
            </div>

            <p className="font-normal mr-2">{event.user.name}</p>

            <p className="text-[14px]">
              <CreatedAt createdAt={event.createdAt} />
            </p>
          </div>

          <div className="flex flex-row gap-2 items-start leading-[22px] mb-6">
            <GrLocation />

            <div>
              <p className="text-[16px] leading-[22px]">
                {event.address_line1}
              </p>

              <p className="text-[14px] leading-[22px] font-light">
                {event.city}, {event.state}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2 items-start leading-[22px] mb-6">
            <MdOutlineTimer />

            <div>
              <p className="text-[16px] leading-[22px]">
                {new Date(event.createdAt).toDateString()}
              </p>

              <p className="text-[14px] leading-[22px] font-light">
                {event.startTime} - {event.endTime}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <p className="font-medium text-[16px] leading-[22px]">
              Organizers:
            </p>

            <p className="text-[16px] leading-[22px]">{event.organizer}</p>
          </div>

          <div className="flex flex-row gap-6 items-center justify-between text-[#292D32] mb-4">
            <div className="flex flex-col justify-center items-center">
              <MdOutlineCalendarMonth size={24} color="#292D32" />
              <p className="text-[12px] leading-[22px]">3 days to go</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <HiUserGroup size={24} color="#292D32" />
              <p className="text-[12px] leading-[22px]">3 days to go</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <MdOutlineDirections size={24} color="#292D32" />
              <p className="text-[12px] leading-[22px]">3 days to go</p>
            </div>
          </div>

          <Button.Sliding
            label="Slide to join event"
            onComplete={() => console.log("join")}
          />
        </div>
      </SimpleAnimatedComponent>
    </div>
  );
};

export default VolunteerEventDetail;
