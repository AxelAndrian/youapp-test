import { ReactNode } from "react";

type GradientLayoutProps = {
  children: ReactNode;
};

const GradientLayout = ({ children }: GradientLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] text-white">
      <div className="flex flex-col min-h-screen max-w-md mx-auto px-4 sm:px-6 md:max-w-2xl lg:max-w-4xl w-full">
        {children}
      </div>
    </div>
  );
};

export default GradientLayout;
