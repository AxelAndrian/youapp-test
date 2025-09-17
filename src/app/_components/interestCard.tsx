"use client";

import React from "react";
import Card from "@/_components/ui/card";
import { cn } from "@/_utils/cn";
import { TProfile } from "../_entities/profile";
import { Pen } from "lucide-react";
import Badge from "@/_components/ui/badge";
import Link from "next/link";

interface IInterestCard extends React.HTMLAttributes<HTMLDivElement> {
  profile?: TProfile;
  isLoading?: boolean;
  className?: string;
}

const InterestCard = React.forwardRef<HTMLDivElement, IInterestCard>(
  ({ className, profile = {}, isLoading = false, ...rest }, ref) => {
    return (
      <Card
        className={cn("bg-[#0E191F] space-y-8", className)}
        isLoading={isLoading}
        {...rest}
        ref={ref}
      >
        <div className="w-full inline-flex items-center justify-between">
          <h5 className="text-sm font-bold">Interest</h5>
          <Link className="p-0" href="/interest">
            <Pen size={18} />
          </Link>
        </div>
        {(profile.interests?.length ?? 0) > 0 && (
          <div className="inline-flex items-center gap-3">
            {profile.interests?.map((interest, idx) => (
              <Badge key={idx}>{interest}</Badge>
            ))}
          </div>
        )}
        {(profile.interests?.length ?? 0) === 0 && (
          <p className="text-sm font-medium text-white/50 pr-5">
            Add in your interest to find a better match
          </p>
        )}
      </Card>
    );
  }
);

export default InterestCard;
