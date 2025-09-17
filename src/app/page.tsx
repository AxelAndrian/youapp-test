"use client";

import SolidLayout from "@/_components/solidLayout";
import Button from "@/_components/ui/button";
import { ChevronLeft, Ellipsis } from "lucide-react";
import { useMemo } from "react";
import BannerCard from "./_components/bannerCard";
import { TProfile } from "./_entities/profile";
import AboutCard from "./_components/aboutCard";
import InterestCard from "./_components/interestCard";
import { Dropdown } from "@/_components/ui/dropdown";
import { SessionToken } from "@/_libs/cookies";
import { useProfile } from "./_hooks/profile";

export default function Home() {
  const { data, isLoading, isError } = useProfile();

  const profile = useMemo<TProfile | null>(() => (data ? data : null), [data]);

  console.log(profile);

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
        <h5 className="font-semibold text-sm">
          {profile ? `@${profile.username ?? ""}` : ""}
        </h5>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button variant="link" className="font-bold" type="button">
              <Ellipsis />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content align="end">
            <Dropdown.Item
              onClick={() => {
                SessionToken.remove();
                window.location.href = "/login";
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
      {isLoading ? (
        <div className="text-center text-white/60">Loading profile...</div>
      ) : isError || !profile ? (
        <div className="text-center text-red-400">Failed to load profile.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <BannerCard profile={profile} />
          <div className="space-y-4.5">
            <AboutCard profile={profile} />
            <InterestCard profile={profile} />
          </div>
        </div>
      )}
    </SolidLayout>
  );
}
