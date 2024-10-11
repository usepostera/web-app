import { ReactNode } from "react";

export type TUser = {
  email: string;
};

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

export type TUserAddress = {
  _id: string;
  address: string;
  addressType: UserAddressType;
};

export type TPickupRequest = {
  _id: string;
};

export type LoginVerificationData = {
  code: string;
  session: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OutlinedButtonProps = {};
