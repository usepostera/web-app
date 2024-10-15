import React, { useCallback, useEffect, useState } from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import Inputs from "../components/Input";
import SimpleAnimatedComponent from "../components/SimpleAnimatedComponent";
import Button from "../components/Button";
import { useMe } from "../hooks/useMe";
import Loader from "../components/Loader";
import { RequiresEmailOtp, TRawApiError } from "../@types";
import { ErrorCodes } from "../lib/constants";
import OtpInput from "../components/OtpInput";

const NotificationSettings: React.FC = () => {
  const [isOtpOpen, setIsOtpOpen] = useState<RequiresEmailOtp | null>(null);
  const handleRawErrow = useCallback((data: TRawApiError) => {
    if (data.code === ErrorCodes.RequiredEmailOtp) {
      setIsOtpOpen(data);
      return true;
    }

    return false;
  }, []);

  const {
    me,
    loading: loadingMe,
    updatingMe,
    httpUpdateMe,
  } = useMe({ updateUserHandlerOptions: { rawError: handleRawErrow } });

  const toggleEmailNotifications = useCallback(() => {
    if (!me) {
      return;
    }

    httpUpdateMe({ email_notifications: !me.email_notifications });
  }, [httpUpdateMe, me]);

  const [email, setEmail] = useState("");

  const reset = useCallback(() => {
    setEmail("");
    setIsOtpOpen(null);
  }, []);

  useEffect(() => {
    return reset;
  }, [reset]);

  const onSubmitOtp = useCallback(
    (code: string) => {
      if (code) {
        httpUpdateMe({ code, session: isOtpOpen?.session, email }).then(
          (isDone) => isDone && setIsOtpOpen(null)
        );
      } else {
        setIsOtpOpen(null);
      }
    },
    [email, httpUpdateMe, isOtpOpen?.session]
  );

  useEffect(() => {
    if (me && me.email) {
      setEmail(me.email);
    }
  }, [me]);

  if (loadingMe || !me) {
    return <Loader size={20} />;
  }

  return (
    <>
      <OtpInput
        isOpen={Boolean(isOtpOpen)}
        message={isOtpOpen?.message ?? ""}
        onSubmit={onSubmitOtp}
        loading={updatingMe}
      />
      <div className="md:max-w-[380px] font-montserrat">
        <h4 className="text-center text-[20px] leading-[24.38px] mb-8">
          Notification Settings
        </h4>

        <SimpleAnimatedComponent>
          <div className="flex flex-row justify-between mb-2 gap-4">
            <p className="text-[20px] leading-[24.38px]">
              Enable email notifications
            </p>

            <Inputs.Switch
              isOn={me.email_notifications}
              onToggle={toggleEmailNotifications}
              disabled={updatingMe}
            />
          </div>

          <p className="text-[14px] leading-[17.07px] md:max-w-[285px] mb-8">
            Enable email notifications to receive reminders for recycling
            pickups and reward updates
          </p>
        </SimpleAnimatedComponent>

        <SimpleAnimatedComponent className="delay-300 mb-3">
          <p className="text-[14px] leading-[17.07px] mb-2">
            You will be notified by email for any updates. Enter email below to
            continue
          </p>

          <Inputs.TextV2
            placeholder="dboy.ife@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={updatingMe || Boolean(me.email)}
          />
        </SimpleAnimatedComponent>

        {me.email_notifications && email !== me.email && (
          <SimpleAnimatedComponent className="w-fit ml-auto">
            <Button.Contained
              label="Update"
              type="button"
              onClick={() => httpUpdateMe({ email })}
              loading={updatingMe}
              disabled={updatingMe}
            />
          </SimpleAnimatedComponent>
        )}
      </div>
    </>
  );
};

const NotificationSettingsPage = withAuthRedirect(NotificationSettings);
export default NotificationSettingsPage;
