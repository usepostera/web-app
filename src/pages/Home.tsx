/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import Inputs from "../components/Input";
import SearchIcon from "../assets/svgs/search_icon.svg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useRecyclableService } from "../services/recyclable";
import {
  initializeRecyclables,
  selectRecyclableItem,
} from "../store/recyclableSlice";
import { RecyclableCard } from "../components/RecyclableCard";
import { TRecyclable } from "../types";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const recyclables = useAppSelector((state) => state.recyclables.data);
  const selectRecyclableId = useAppSelector(
    (state) => state.recyclables.selectedId
  );
  const isRecyclableInitialzed = useAppSelector(
    (state) => state.recyclables.isInitialzed
  );

  const { getRecyclables } = useRecyclableService();
  const { trigger, loading } = useRequestHandler(getRecyclables);

  const httpFetchRecyclables = useCallback(async () => {
    const result = await trigger();
    if (result) {
      dispatch(initializeRecyclables(result));
    }
  }, [trigger, dispatch]);

  useEffect(() => {
    if (!isRecyclableInitialzed) {
      httpFetchRecyclables();
    }
  }, [httpFetchRecyclables, isRecyclableInitialzed]);

  const onSelect = useCallback(
    (item: TRecyclable) => {
      dispatch(selectRecyclableItem(item._id));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-row gap-8 font-montserrat p-8">
      <div className="flex-1 flex flex-col gap-6">
        <SimpleAnimatedComponent>
          <div className="w-full bg-[#228B22] p-4 rounded-[20px] flex flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-[32px] leading-[39.01px] font-semibold text-white max-w-[253px] mb-4">
                It&apos;s time to recycle
              </h3>

              <p className="text-[18px] leading-[21.94px] text-white max-w-[271px]">
                Welcome to recycle pro. Here, we save the world by recycling
                waste and paying you for it
              </p>
            </div>

            <div>
              <img
                src="/pngs/image2.png"
                className="w-[199px] h-[199px] object-contain"
                alt=""
              />
            </div>
          </div>
        </SimpleAnimatedComponent>

        <SimpleAnimatedComponent>
          <Inputs.Text
            placeholder="Search here"
            className="!rounded-[40px] h-[40px] pl-4 !border-[#0000004D]"
            prefixIcon={<SearchIcon />}
          />
        </SimpleAnimatedComponent>

        <div className="flex flex-row flex-wrap gap-6">
          {!loading &&
            recyclables.map((recyclable) => (
              <RecyclableCard
                data={recyclable}
                key={recyclable._id}
                onSelect={onSelect}
                selected={selectRecyclableId === recyclable._id}
              />
            ))}
        </div>
      </div>

      <div className="flex-1 max-w-[380px]"></div>
    </div>
  );
};

export default withAuthRedirect(DashboardPage);
