"use client";

import GradientLayout from "@/_components/gradientLayout";
import Button from "@/_components/ui/button";
import TagsInput from "@/_components/ui/tags-input";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/_libs/axios/api";
import {
  useCreateProfile,
  useProfile,
  useUpdateProfile,
} from "@/app/_hooks/profile";

export default function InterestPage() {
  const [tagInterests, setTagInterest] = useState<Array<string>>([]);

  const qc = useQueryClient();

  // Load current profile to get existing interests
  const { data: profile, isLoading } = useProfile();

  // Update interests when profile loads
  useEffect(() => {
    if (profile?.interests) {
      setTagInterest(profile.interests);
    }
  }, [profile]);

  const createMutation = useCreateProfile();
  const updateMutation = useUpdateProfile();

  const createInterest = (interests: string[]) => {
    createMutation.mutate(
      {
        ...profile,
        interests,
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["profile"] });
          window.history.back();
        },
        onError: (error) => {
          console.error("Create profile error:", error);
        },
      }
    );
  };

  const updateInterest = (interests: string[]) => {
    updateMutation.mutate(
      {
        ...profile,
        interests,
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["profile"] });
          window.history.back();
        },
        onError: (error) => {
          console.error("Update profile error:", error);
        },
      }
    );
  };

  const handleSave = () => {
    if (profile?.name) {
      updateInterest(tagInterests);
    } else {
      createInterest(tagInterests);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <GradientLayout>
      <main className="grid grid-cols-1 gap-6">
        {/* BACK BUTTON  */}
        <div className="mt-10 mb-16 inline-flex items-center justify-between">
          <Button
            variant="link"
            className="font-bold px-0"
            type="button"
            onClick={() => window.history.back()}
          >
            <ChevronLeft />
            Back
          </Button>
          <Button
            variant="link"
            className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ABFFFD] to-[#4599DB]"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
        <div className="px-8">
          <div className="space-y-3 mb-9">
            <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#94783E] via-[#F3EDA6] via-[#F8FAE5] via-[#FFE2BE] to-[#D5BE88]">
              Tell everyone about yourself
            </h2>
            <h1 className="text-xl font-bold text-white">What interest you?</h1>
          </div>
          {isLoading ? (
            <div className="text-center text-white/60">
              Loading interests...
            </div>
          ) : (
            <>
              <TagsInput
                placeholder=""
                value={tagInterests}
                onChange={(tag) => setTagInterest(tag)}
              />
              {(createMutation.error || updateMutation.error) && (
                <div className="text-red-400 text-xs mt-2">
                  {createMutation.error?.message ||
                    updateMutation.error?.message ||
                    "Failed to save interests"}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </GradientLayout>
  );
}
