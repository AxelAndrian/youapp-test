import { ReactNode } from "react";

type SolidLayoutProps = {
  children: ReactNode;
};

const SolidLayout = ({ children }: SolidLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#09141A] text-white">
      <div className="flex flex-col min-h-screen max-w-md mx-auto px-4 sm:px-6 md:max-w-2xl lg:max-w-4xl w-full">
        {children}
      </div>
    </div>
  );
};

export default SolidLayout;
