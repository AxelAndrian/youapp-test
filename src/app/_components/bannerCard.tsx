"use client";

import React from "react";
import Card from "@/_components/ui/card";
import { cn } from "@/_utils/cn";
import { TProfile } from "../_entities/profile";
import Badge from "@/_components/ui/badge";

import ProfileImg from "@/assets/images/profile-img.jpg";
import { calculateAge } from "@/_utils/calculate-age";
import { getHoroscopeIcon, getZodiacIcon } from "@/_utils/zodiac_birthdate";

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
        {profile?.name && (
          <div className="absolute bottom-4 left-4 space-y-3">
            {/* Username and Age */}
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                @{profile?.username}, {calculateAge(profile?.birthday ?? "")}
              </p>
              <p className="text-xl font-medium text-white">Male</p>
            </div>

            {/* Zodiac Badges */}
            <div className="flex gap-2">
              {profile?.horoscope && (
                <Badge>
                  <span className="mr-1">
                    {getHoroscopeIcon(profile.horoscope)}
                  </span>
                  {profile.horoscope}
                </Badge>
              )}
              {profile?.zodiac && (
                <Badge>
                  <span className="mr-1">{getZodiacIcon(profile.zodiac)}</span>
                  {profile.zodiac}
                </Badge>
              )}
            </div>
          </div>
        )}
      </Card>
    );
  }
);

export default BannerCard;
