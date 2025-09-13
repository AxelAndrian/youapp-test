"use client";

import React from "react";
import Card from "@/_components/ui/card";
import { cn } from "@/_utils/cn";
import { TProfile } from "../_entities/profile.schema";

import ProfileImg from "@/assets/images/profile-img.jpg";

interface IBannerCard extends React.HTMLAttributes<HTMLDivElement> {
  profile?: TProfile;
  isLoading?: boolean;
  className?: string;
}

const BannerCard = React.forwardRef<HTMLDivElement, IBannerCard>(
  ({ className, profile = {}, isLoading = false, ...rest }, ref) => {
    return (
      <Card
        className={cn(
          "h-[190px] flex flex-row bg-cover bg-center relative overflow-hidden",
          className
        )}
        style={
          !isLoading
            ? {
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.2) 100%), url(${ProfileImg.src})`,
              }
            : {
                backgroundColor: `#0E191F`,
              }
        }
        isLoading={isLoading}
        {...rest}
        ref={ref}
      >
        <div className="space-y-3 mt-auto">
          <p className="text-base font-bold">@{profile?.username}</p>
        </div>
      </Card>
    );
  }
);

export default BannerCard;
