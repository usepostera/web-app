/* eslint-disable react-refresh/only-export-components */
import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 flex justify-end">
      <WalletDefault />
    </div>
  );
};

export default withAuthRedirect(DashboardPage);
