"use client";

import SolidLayout from "@/_components/solidLayout";
import Button from "@/_components/ui/button";
import { ChevronLeft, Ellipsis } from "lucide-react";
import { useState } from "react";
import BannerCard from "./_components/bannerCard";
import { TProfile } from "./_entities/profile.schema";
import AboutCard from "./_components/aboutCard";
import InterestCard from "./_components/interestCard";
import { Dropdown } from "@/_components/ui/dropdown";

export default function Home() {
  const [interests, setInterests] = useState<Array<string>>([
    "Music",
    "Basketball",
    "Fitness",
  ]);

  const [profile, setProfile] = useState<TProfile>({
    email: "johndoe@gmail.com",
    username: "123johndoe",
    name: "John Doe",
    birthday: "28/08/1995",
    horoscope: "Virgo",
    zodiac: "Pig",
    height: 175,
    weight: 69,
    interest: ["Music", "Basketball", "Fitness"],
  });

  return (
    <SolidLayout>
      {/* HEADER  */}
      <div className="my-10 inline-flex items-center justify-between">
        <Button
          variant="link"
          className="font-bold px-0"
          type="button"
          onClick={() => window.history.back()}
        >
          <ChevronLeft />
          Back
        </Button>
        <h5 className="font-semibold text-sm">@{profile.username}</h5>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button variant="link" className="font-bold" type="button">
              <Ellipsis />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content align="end">
            <Dropdown.Item
              onClick={() => {
                // Add your logout logic here
                console.log("Logout clicked");
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <BannerCard profile={profile} />
        <div className="space-y-4.5">
          <AboutCard profile={profile} />
          <InterestCard profile={profile} />
        </div>
      </div>
    </SolidLayout>
  );
}
