import Image from "next/image";
import { ReactNode } from "react";
import bgDesktopLight from "../public/assets/bg-desktop-light.jpg";
import bgDesktopDark from "../public/assets/bg-desktop-dark.jpg";
import bgMobileLight from "../public/assets/bg-mobile-light.jpg";
import bgMobileDark from "../public/assets/bg-mobile-dark.jpg";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/useIsMobileScreen";

type BackgroundProps = {
  children: ReactNode;
};

export const Background = ({ children }: BackgroundProps) => {
  const { theme } = useTheme();
  const isMobileScreen = useIsMobile();

  return (
    <section className="h-screen bg-light-veryLightGray dark:bg-dark-veryDarkBlue relative">
      {isMobileScreen ? (
        <Image
          priority
          src={theme === "dark" ? bgMobileDark : bgMobileLight}
          alt={theme === "dark" ? "bg-mobile-dark" : "bg-mobile-light"}
          className="w-full h-auto absolute"
        />
      ) : (
        <Image
          priority
          src={theme === "dark" ? bgDesktopDark : bgDesktopLight}
          alt={theme === "dark" ? "bg-desktop-dark" : "bg-desktop-light"}
          className="w-full h-auto absolute"
        />
      )}
      <div className="absolute w-full flex justify-center">
        <section className="xl:w-[37.5%] md:w-[70%] w-full px-8 md:px-0">
          {children}
        </section>
      </div>
    </section>
  );
};
