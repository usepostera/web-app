import { useNavigate } from "react-router-dom";
import RippleEffect from "./Ripple";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { FaLongArrowAltLeft } from "react-icons/fa";

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <SimpleAnimatedComponent>
      <RippleEffect
        className="flex flex-row items-center gap-2 text-[12px] mb-2 w-fit"
        onClick={() => navigate(-1)}
      >
        <FaLongArrowAltLeft /> <span>Go back</span>
      </RippleEffect>
    </SimpleAnimatedComponent>
  );
};

export default GoBack;
