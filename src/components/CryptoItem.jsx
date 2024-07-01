import WebApp from "@twa-dev/sdk";
import { FaCheckCircle } from "react-icons/fa";

export default function CryptoItem({ children, active, onClick, icon }) {
  const clickHandler = () => {
    WebApp.HapticFeedback.impactOccurred("soft");
    onClick();
  };

  return (
    <div
      onClick={clickHandler}
      className={`flex items-center justify-between w-full border-[1px] rounded-md p-[12px] ${active ? "border-[#B0B8C4] shadow-[0_0_0_3px_#ce93d8]" : "border-[#DAE2ED] shadow-[0px_2px_2px_#DAE2ED]"}`}
    >
      <div className="flex gap-2 items-center">
        <div className="w-[24px] h-[24px]">
          <img src={icon} />
        </div>
        <p>{children}</p>
      </div>
      {active && <FaCheckCircle className="text-[#ba68c8]" />}
    </div>
  );
}
