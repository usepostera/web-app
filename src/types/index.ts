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
};

export type ContainedButtonProps = {
  variant?: "contained" | "outlined";
};

export type LoginData = {
  walletAddress: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

export type LoginVerificationData = {
  code: string;
  session: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OutlinedButtonProps = {};
