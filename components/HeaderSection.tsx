import Image from "next/image";
import iconMoon from "../public/icons/icon-moon.svg";
import iconSun from "../public/icons/icon-sun.svg";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/useIsMobileScreen";

export const HeaderSection = () => {
  const { toggleTheme, theme } = useTheme();
  const isMobileScreen = useIsMobile();

  return (
    <header className="flex justify-between items-center w-full mt-12 md:mt-[82px]">
      <h1 className="text-light-veryLightGray text-xl md:text-[48px] font-semibold tracking-[15px]">
        TODO
      </h1>
      <Image
        onClick={toggleTheme}
        src={theme === "light" ? iconMoon : iconSun}
        alt="theme-icon"
        width={isMobileScreen ? 20 : 30}
        height={isMobileScreen ? 20 : 30}
        className="cursor-pointer"
      />
    </header>
  );
};
