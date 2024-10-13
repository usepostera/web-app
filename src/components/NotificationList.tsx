import React, { useCallback } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { InfiniteScroll } from "./InfiniteScroll";
import { NotificationAction, TNotification } from "../@types";
import Button from "./Button";
import { usePickupService } from "../services/pickup";
import { useRequestHandler } from "../hooks/useRequestHandler";
import toast from "react-hot-toast";

export const NotificationList: React.FC = () => {
  const { notifications, loadMore, hasMore, loading, update } =
    useNotifications();

  return (
    <InfiniteScroll
      items={notifications}
      hasMore={hasMore}
      isFetching={loading}
      loadMore={loadMore}
      renderItem={(item) => (
        <NotificationTile key={item._id} data={item} update={update} />
      )}
    />
  );
};

type NotificationTileProps = {
  data: TNotification;
  update?: (val: TNotification) => void;
};
const NotificationTile: React.FC<NotificationTileProps> = (props) => {
  const { data, update } = props;

  const { confirmPickupMeasurement } = usePickupService();
  const { trigger, loading } = useRequestHandler(confirmPickupMeasurement);
  const httpconfirmPickupMeasurement = useCallback(async () => {
    if (!data.refId) return;
    const result = await trigger(data.refId);
    if (result) {
      toast.success(result.message);
      if (update) {
        update({ ...data, action_complete: true });
      }
    }
  }, [data, trigger, update]);

  const renderAction = useCallback(() => {
    if (
      typeof data.action === "undefined" ||
      data.action === null ||
      data.action_complete
    )
      return null;

    switch (data.action) {
      case NotificationAction.acceptMeasuredUnit:
        if (!data.refId) return null;
        return (
          <Button.Contained
            label="Confirm"
            type="button"
            onClick={httpconfirmPickupMeasurement}
            loading={loading}
          />
        );
    }
  }, [
    data.action,
    data.action_complete,
    data.refId,
    httpconfirmPickupMeasurement,
    loading,
  ]);

  return (
    <div className="w-full p-4 border-b-[1px] border-[#0000004D] space-y-2">
      <p className="text-[16px] leading-[22px]">{data.message}</p>

      <p className="text-[12px] leading-[24px]">
        {new Date(data.createdAt).toDateString()}
      </p>

      <div className="w-fit">{renderAction()}</div>
    </div>
  );
};
