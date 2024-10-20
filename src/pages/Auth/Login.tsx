import React from "react";
import withAuthProtection from "../../hoc/withAuthProtection";
import SimpleAnimatedComponent from "../../components/SimpleAnimatedComponent";
import { ConnectButton } from "../../components/ConnectButton";

const Login: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-0 font-montserrat font-normal">
      <div className="flex flex-col items-center gap-4 max-w-[375px] mx-auto">
        <SimpleAnimatedComponent>
          <form className="w-full rounded-[20px] bg-[#FFFFFFB2] px-5 py-6 flex flex-col gap-6">
            <h1 className="text-black text-center text-[36px] font-semibold leading-[43.88px] transition">
              Welcome!
            </h1>

            <p className="text-[14px] leading-[17.07px] mb-2 text-center">
              Welcome to Postera. Please, connect your SMART wallet to continue.
            </p>

            <ConnectButton />
          </form>
        </SimpleAnimatedComponent>
      </div>
    </div>
  );
};

export const LoginPage = withAuthProtection(Login);
