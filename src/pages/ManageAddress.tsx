import React, { useState } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import AddressList from "../components/AddressList";
import Button from "../components/Button";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import CreateAddress from "../components/CreateAddress";

const ManageAddress: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (isCreateOpen) {
    return (
      <div className="md:max-w-[380px]">
        <CreateAddress onComplete={() => setIsCreateOpen(false)} showClose />;
      </div>
    );
  }

  return (
    <SimpleAnimatedComponent>
      <div className="md:max-w-[380px]">
        <AddressList />

        <div className="mt-2 w-fit">
          <Button.Text
            label="Add Another Address +"
            onClick={() => setIsCreateOpen(true)}
          />
        </div>
      </div>
    </SimpleAnimatedComponent>
  );
};

const ManageAddressPage = withAuthRedirect(ManageAddress);
export default ManageAddressPage;
