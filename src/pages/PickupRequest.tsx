/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from "react";
import PickupOverview from "../components/PickupOverview";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { usePickupRequets } from "../hooks/usePickupRequets";
import { TPickupRequest } from "../@types";
import Recycle from "../assets/svgs/recycle.svg";
import { formatLargeNumber } from "../lib/helpers";
import RippleEffect from "../components/Ripple";
import { InfiniteScroll } from "../components/InfiniteScroll";
import { useNavigate, useParams } from "react-router-dom";
import { PickupDetails } from "../components/PickupDetails";
import useDeviceView from "../hooks/useDeviceView";
import GoBack from "../components/GoBack";

const PickupRequestPage: React.FC = () => {
  const { id } = useParams();
  const { pickups, loading, total, totalEarned, loadMore, hasMore } =
    usePickupRequets();

  const isMobile = useDeviceView();

  return (
    <div className="flex flex-col md:!flex-row md:gap-8 md:gap-[80px] font-montserrat p-4 md:p-8">
      {isMobile && id && (
        <div className="my-2">
          <GoBack />
        </div>
      )}

      <div className={`flex-1 ${id ? "hidden md:block" : ""}`}>
        <SimpleAnimatedComponent className="delay-300 mb-12">
          <div>
            <h3 className="text-[20px] leading-[24.38px] font-normal mb-4">
              Overview
            </h3>

            <div className="flex flex-row gap-4 items-stretch">
              <PickupOverview title="Total Pickups" count={total} />

              <PickupOverview
                title="Leaderboard Points Earned"
                count={totalEarned}
              />
            </div>
          </div>
        </SimpleAnimatedComponent>

        <div>
          <h3 className="text-[20px] leading-[24.38px] font-normal mb-4">
            My pickups
          </h3>

          <InfiniteScroll
            items={pickups}
            hasMore={hasMore}
            isFetching={loading}
            loadMore={loadMore}
            renderItem={(item) => (
              <PickupTile
                key={item._id}
                data={item}
                isSelected={item._id === id}
              />
            )}
          />
        </div>
      </div>

      <div className="flex-1">{id && <PickupDetails id={id} />}</div>
    </div>
  );
};

export default withAuthRedirect(PickupRequestPage);

type PickTileProps = {
  data: TPickupRequest;
  isSelected?: boolean;
};

const PickupTile: React.FC<PickTileProps> = (props) => {
  const navigate = useNavigate();
  const {
    data: { item, createdAt, amount, _id },
    isSelected = false,
  } = props;

  const onSelect = useCallback(() => {
    navigate(`/pickups/${_id}`);
  }, [_id, navigate]);

  return (
    <SimpleAnimatedComponent className="!delay-300">
      <RippleEffect
        className={`transition-color w-full p-2 rounded-[12px] border-[1px] ${
          isSelected ? "border-[#228B22]" : "border-[#0000004D] "
        }`}
        onClick={onSelect}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-4">
            <Recycle />

            <div>
              <p className="text-[12px] leading-[22px] font-light text-left">
                {item.name}
              </p>
              <p className="text-[14px] leading-[22px]">
                {new Date(createdAt).toDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-[12px] leading-[22px] font-light">Est payout</p>
            <p className="text-[14px] leading-[22px]">
              {formatLargeNumber(+amount)}
            </p>
          </div>
        </div>
      </RippleEffect>
    </SimpleAnimatedComponent>
  );
};
