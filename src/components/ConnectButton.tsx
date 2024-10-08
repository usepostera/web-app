import { ConnectWallet, ConnectWalletText } from "@coinbase/onchainkit/wallet";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAuthService } from "../services/auth";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useAppDispatch, useAppSelector } from "../store/store";
import { login } from "../store/authSlice";

export function ConnectButton() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const { isConnected, address } = useAccount();

  const { login: httpLogin } = useAuthService();
  const { trigger } = useRequestHandler(httpLogin);

  useEffect(() => {
    if (isConnected && address && !isAuthenticated) {
      (async () => {
        const response = await trigger({ walletAddress: address });
        if (response) {
          dispatch(login({ token: response.token }));
        }
      })();
    }
  }, [isConnected, address, isAuthenticated, trigger, dispatch]);

  return (
    <ConnectWallet className="rounded-[6px] h-[40px] py-[13px] px-[12px] w-full flex justify-center items-center bg-[#228B22] hover:bg-[#228B22] hover:opacity-[0.7]">
      <ConnectWalletText>Log in</ConnectWalletText>
    </ConnectWallet>
  );
}
