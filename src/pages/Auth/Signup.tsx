import React from "react";
import withAuthProtection from "../../hoc/withAuthProtection";
import Inputs from "../../components/Input";
import Button from "../../components/Button";
import SimpleAnimatedComponent from "../../components/SimpleAnimatedComponent";
import WalletIcon from "../../assets/wallet-money.svg";
import GoogleIcon from "../../assets/google.svg";

const Signup: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-0 font-montserrat font-normal">
      <div className="flex flex-col items-center gap-4 max-w-[375px] mx-auto">
        <SimpleAnimatedComponent>
          <h1 className="text-white text-[36px] font-semibold leading-[43.88px] transition">
            Welcome!
          </h1>
        </SimpleAnimatedComponent>

        <SimpleAnimatedComponent>
          <form className="w-full rounded-[20px] bg-[#FFFFFFB2] px-5 py-6 flex flex-col gap-6">
            <p className="text-[14px] leading-[17.07px] mb-2">
              Welcome to recycle pro. Here, we save the world by recycling waste
              and stuffs. Yes, we are superheroes
            </p>

            <Inputs.Text
              label="Email address"
              placeholder="omoniyiifedimeji@gmail.com"
            />

            <Inputs.Text
              label="Verification code"
              placeholder="Enter code sent to email"
            />

            <Button.Contained label="Sign up" />

            <p className="text-[14px] leading-[17.07px] text-center font-light my-2">
              OR
            </p>

            <Button.Outlined
              label="Continue with Wallet"
              prefixIcon={<WalletIcon />}
            />

            <Button.Outlined
              label="Continue with Google"
              prefixIcon={<GoogleIcon />}
            />
          </form>
        </SimpleAnimatedComponent>
      </div>
    </div>
  );
};

export const SignupPage = withAuthProtection(Signup);
