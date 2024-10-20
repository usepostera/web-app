import { ReactNode } from "react";
import { ErrorCodes } from "../lib/constants";

export type TUser = {
  _id: string;
  walletAddress: string;
  monthlyScores: { [key: string]: number };
  coins: number;
  email_notifications: boolean;
  email?: string;
};

export type TLeaderboardData = Omit<TUser, "coins">;

export interface IFormFieldValidator<T, FormType extends object> {
  validate: (value: T, form: FormType) => TValidatorError;
}

export type Validator<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]?: IFormFieldValidator<any, T>;
};

export type TValidatorError = string | (string | null)[] | null;

export type GlobalButtonProps = {
  label: string;
  type?: "button" | "submit";
  loading?: boolean;
  onClick?: VoidFunction;
  disabled?: boolean;
  prefixIcon?: ReactNode;
  className?: string;
  form?: string;
};

export type ContainedButtonProps = {
  variant?: "contained" | "outlined";
};

export type LoginData = {
  walletAddress: string;
};

export type TUpdateMe = {
  email_notifications?: boolean;
  email?: string;
  session?: string;
  code?: string;
};

export type PickupRequestInput = {
  size: number | "";
  addressId: string;
};

export type AddressInput = {
  addressType: UserAddressType | "";
  address: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

export enum RecyclableUnit {
  Kg = "Kg",
  Unit = "Unit",
}

export type TRecyclable = {
  _id: string;
  name: string;
  image: string;
  unit: RecyclableUnit;
  price_per_unit: number;
};

export enum UserAddressType {
  Home = "Home",
  Work = "Work",
}

export enum PickupRequestStatus {
  pending = "pending",
  accepted = "accepted",
  processing = "processing",
  complete = "complete",
}

export enum NotificationAction {
  acceptMeasuredUnit,
}

export type TUserAddress = {
  _id: string;
  address: string;
  addressType: UserAddressType;
};

export type TNotification = {
  _id: string;
  message: string;
  action: NotificationAction | null;
  refId: string | null;
  createdAt: string;
  action_complete: boolean;
};

export type TPickupRequest = {
  _id: string;
  address: TUserAddress;
  item: TRecyclable;
  size: number;
  amount: number;
  pickup_date: string;
  date_completed: string;
  status: PickupRequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type LoginVerificationData = {
  code: string;
  session: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OutlinedButtonProps = {};

export type RequiresEmailOtp = {
  code: ErrorCodes.RequiredEmailOtp;
  message: string;
  session: string;
};

export type TRawApiError = RequiresEmailOtp;

export type TVolunteerEvent = {
  _id: string;
  image: string;
  title: string;
  limit?: number | "";
  address_line1: string;
  city: string;
  state: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
  mapLink?: string;
  createdAt: string;
  participantIds: string[];
  user: {
    name: string;
    email: string;
  };
};

export type TWithdrawal = {
  transactionHash: string | undefined;
  blockNumber: string | number | bigint | undefined;
  user: string;
  amount: string;
  timestamp: number;
};
