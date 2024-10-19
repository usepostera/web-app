import { PickupRequestStatus, RecyclableUnit } from "../@types";

export const recyclableUnitDescriptionMapping = {
  [RecyclableUnit.Kg]: "weight",
  [RecyclableUnit.Unit]: "unit",
};

export const pickupStatusColors = {
  [PickupRequestStatus.pending]: {
    background: "#f8d7da",
    foreground: "#721c24",
  }, // Light red background, dark red text
  [PickupRequestStatus.accepted]: {
    background: "#d4edda",
    foreground: "#155724",
  }, // Light green background, dark green text
  [PickupRequestStatus.processing]: {
    background: "#fff3cd",
    foreground: "#856404",
  }, // Light yellow background, dark brown text
  [PickupRequestStatus.complete]: {
    background: "#d1ecf1",
    foreground: "#0c5460",
  }, // Light blue background, dark blue text
};

export enum ErrorCodes {
  RequiredEmailOtp = 1000,
}

export const LOCATION_MAPPINGS = {
  home: "/",
  pickup: "/pickups",
  volunteer: "/volunteer",
  leaderboard: "/leaderboard",
  account: "/account",
  notification: "/notifications",
};

export const deployedContract = {
  address: import.meta.env.VITE_CONTRACT_ADDRESS,
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "not_Owner",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "admin",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "AdminDeposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "FundsWithdrawn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newEarning",
          type: "uint256",
        },
      ],
      name: "WasteEarningUpdated",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [],
      name: "Deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "MIN_DEPOSIT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getContractBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "getWasteEarnings",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "s_amountFunded",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "s_userExist",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "earnings",
          type: "uint256",
        },
      ],
      name: "updateWasteEarning",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "earnings",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};

export const COINBASE_API_KEY = import.meta.env
  .VITE_COINBASE_ONCHAINKIT_API_KEY;
