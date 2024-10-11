/* eslint-disable react-refresh/only-export-components */
import React from "react";
import PickupOverview from "../components/PickupOverview";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { usePickupRequets } from "../hooks/usePickupRequets";
import { TPickupRequest } from "../@types";
import Recycle from "../assets/svgs/recycle.svg";
import { formatLargeNumber } from "../lib/helpers";
import RippleEffect from "../components/Ripple";
import { InfiniteScroll } from "../components/InfiniteScroll";

const PickupRequestPage: React.FC = () => {
  const { pickups, loading, loadMore, hasMore } = usePickupRequets();

  return (
    <div className="flex flex-col md:!flex-row gap-8 font-montserrat p-4 md:p-8">
      <div className="flex-1">
        <SimpleAnimatedComponent className="delay-300 mb-12">
          <div>
            <h3 className="text-[20px] leading-[24.38px] font-normal mb-4">
              Overview
            </h3>

            <div className="flex flex-row gap-4 items-stretch">
              <PickupOverview title="Total Pickups" count={67} />

              <PickupOverview title="Coins Earned" count={67} />
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
            renderItem={(item) => <PickupTile key={item._id} data={item} />}
          />
        </div>
      </div>

      <div className="flex-1">hi</div>
    </div>
  );
};

export default withAuthRedirect(PickupRequestPage);

type PickTileProps = {
  data: TPickupRequest;
};

const PickupTile: React.FC<PickTileProps> = (props) => {
  const {
    data: { item, createdAt, amount },
  } = props;

  return (
    <SimpleAnimatedComponent className="!delay-300">
      <RippleEffect className="w-full flex flex-row justify-between p-2 rounded-[12px] border-[1px] border-[#0000004D]">
        <div className="flex flex-row items-center gap-4">
          <Recycle />

          <div>
            <p className="text-[12px] leading-[22px] font-light">{item.name}</p>
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
      </RippleEffect>
    </SimpleAnimatedComponent>
  );
};
