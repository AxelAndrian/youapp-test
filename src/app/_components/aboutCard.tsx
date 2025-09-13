"use client";

import React, { useState } from "react";
import Card from "@/_components/ui/card";
import { cn } from "@/_utils/cn";
import { TProfile } from "../_entities/profile.schema";
import Button from "@/_components/ui/button";
import { UserRoundPen } from "lucide-react";
import Input from "@/_components/ui/input";

interface IAboutCard extends React.HTMLAttributes<HTMLDivElement> {
  profile?: TProfile;
  isLoading?: boolean;
  className?: string;
}

const AboutCard = React.forwardRef<HTMLDivElement, IAboutCard>(
  ({ className, profile = {}, isLoading = false, ...rest }, ref) => {
    const [editProfile, setEditProfile] = useState<boolean>(false);

    return (
      <Card
        className={cn("bg-[#0E191F] space-y-8", className)}
        isLoading={isLoading}
        {...rest}
        ref={ref}
      >
        <div className="w-full inline-flex items-center justify-between">
          <h5 className="text-sm font-bold">About</h5>
          {editProfile && (
            <Button
              variant="link"
              className="p-0 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#94783E] via-[#F3EDA6] via-[#F8FAE5] via-[#FFE2BE] to-[#D5BE88]"
            >
              Save & Update
            </Button>
          )}
          {!editProfile && (
            <Button
              variant="link"
              className="p-0"
              onClick={() => setEditProfile((prev) => !prev)}
            >
              <UserRoundPen size={18} />
            </Button>
          )}
        </div>
        {editProfile && (
          <div className="space-y-3">
            <div className="inline-flex items-center justify-between w-full gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-white/33"
              >
                Display name:
              </label>
              <Input
                id="name"
                classWrapper="w-4/6"
                className="border border-white/22 text-right"
              />
            </div>
            <div className="inline-flex items-center justify-between w-full gap-2">
              <label
                htmlFor="birthday"
                className="text-sm font-medium text-white/33"
              >
                Birthday:
              </label>
              <Input
                type="date"
                id="birthday"
                classWrapper="w-4/6"
                className="border border-white/22 text-right"
              />
            </div>
            <div className="inline-flex items-center justify-between w-full gap-2">
              <label
                htmlFor="horoscope"
                className="text-sm font-medium text-white/33"
              >
                Horoscope:
              </label>
              <Input
                type="text"
                id="horoscope"
                disabled
                classWrapper="w-4/6"
                className="border border-white/22 text-right"
              />
            </div>
            <div className="inline-flex items-center justify-between w-full gap-2">
              <label
                htmlFor="zodiac"
                className="text-sm font-medium text-white/33"
              >
                Zodiac:
              </label>
              <Input
                type="text"
                id="zodiac"
                disabled
                classWrapper="w-4/6"
                className="border border-white/22 text-right"
              />
            </div>
            <div className="inline-flex items-center justify-between w-full gap-2">
              <label
                htmlFor="height"
                className="text-sm font-medium text-white/33"
              >
                Height:
              </label>
              <Input
                type="number"
                id="height"
                classWrapper="w-4/6"
                className="border border-white/22 text-right"
              />
            </div>
            <div className="inline-flex items-center justify-between w-full gap-2">
              <label
                htmlFor="weight"
                className="text-sm font-medium text-white/33"
              >
                Weight:
              </label>
              <Input
                type="number"
                id="weight"
                classWrapper="w-4/6"
                className="border border-white/22 text-right"
              />
            </div>
          </div>
        )}
        {!editProfile ? (
          profile.name ? (
            //   Render profile details here
            <div className="space-y-4">
              <p className="text-sm font-medium">
                <span className="text-white/33">Birthday:</span>{" "}
                {profile.birthday} (Age 28)
              </p>
              <p className="text-sm font-medium">
                <span className="text-white/33">Horoscope:</span>{" "}
                {profile.horoscope}
              </p>
              <p className="text-sm font-medium">
                <span className="text-white/33">Zodiac:</span> {profile.zodiac}
              </p>
              <p className="text-sm font-medium">
                <span className="text-white/33">Height:</span> {profile.height}{" "}
                cm
              </p>
              <p className="text-sm font-medium">
                <span className="text-white/33">Weight:</span> {profile.weight}{" "}
                kg
              </p>
            </div>
          ) : (
            <p className="text-sm font-medium text-white/50 pr-5">
              Add in your about to help others know you better
            </p>
          )
        ) : null}
      </Card>
    );
  }
);

export default AboutCard;
