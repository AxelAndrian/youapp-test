"use client";

import React, { useEffect, useState } from "react";
import Card from "@/_components/ui/card";
import { cn } from "@/_utils/cn";
import { TProfile, profileSchema } from "../_entities/profile";
import Button from "@/_components/ui/button";
import { UserRoundPen } from "lucide-react";
import FormInput from "@/_components/ui/form-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/_libs/axios/api";
import { computeZodiacs } from "@/_utils/zodiac_birthdate";
import { calculateAge } from "@/_utils/calculate-age";
import { isNumber } from "@/_utils/is_number";
import { useCreateProfile, useUpdateProfile } from "../_hooks/profile";

interface IAboutCard extends React.HTMLAttributes<HTMLDivElement> {
  profile?: TProfile;
  isLoading?: boolean;
  className?: string;
}

const AboutCard = React.forwardRef<HTMLDivElement, IAboutCard>(
  ({ className, profile = {}, isLoading = false, ...rest }, ref) => {
    const [editProfile, setEditProfile] = useState<boolean>(false);

    const qc = useQueryClient();

    const form = useForm<TProfile>({
      resolver: zodResolver(profileSchema) as any,
      defaultValues: {
        email: profile.email ?? "",
        username: profile.username ?? "",
        name: profile.name ?? "",
        birthday: profile.birthday ?? "",
        horoscope: profile.horoscope ?? "",
        zodiac: profile.zodiac ?? "",
        height: typeof profile.height === "number" ? profile.height : 0,
        weight: typeof profile.weight === "number" ? profile.weight : 0,
        interests:
          profile.interests && profile.interests.length > 0
            ? profile.interests
            : ["Music"],
      },
    });

    const birthdayValue = form.watch("birthday");

    useEffect(() => {
      const z = computeZodiacs(birthdayValue);
      form.setValue("horoscope", z.horoscope);
      form.setValue("zodiac", z.zodiac);
    }, [birthdayValue]);

    const createMutation = useCreateProfile();
    const updateMutation = useUpdateProfile();

    const createProfile = (payload: TProfile) => {
      createMutation.mutate(
        {
          name: payload.name,
          birthday: payload.birthday,
          height: payload.height,
          weight: payload.weight,
          interests:
            profile.interests && profile.interests.length > 0
              ? profile.interests
              : ["Music"],
        },
        {
          onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["profile"] });
            setEditProfile(false);
          },
          onError: (error: any) => {
            console.error("Create profile error:", error);
          },
        }
      );
    };

    const updateProfile = (payload: TProfile) => {
      updateMutation.mutate(
        {
          name: payload.name,
          birthday: payload.birthday,
          height: payload.height,
          weight: payload.weight,
          interests:
            profile.interests && profile.interests.length > 0
              ? profile.interests
              : ["Music"],
        },
        {
          onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["profile"] });
            setEditProfile(false);
          },
          onError: (error: any) => {
            console.error("Update profile error:", error);
          },
        }
      );
    };

    const onSubmit: SubmitHandler<TProfile> = (values) => {
      const zodiacs = computeZodiacs(values.birthday);
      const payload: TProfile = {
        ...values,
        ...zodiacs,
        height: values.height,
        weight: values.weight,
      };
      console.log("Payload to send:", payload);
      if (profile.name) updateProfile(payload);
      else createProfile(payload);
    };

    return (
      <Card
        className={cn("bg-[#0E191F] space-y-8", className)}
        isLoading={isLoading}
        {...rest}
        ref={ref}
      >
        {!editProfile && (
          <div className="w-full inline-flex items-center justify-between">
            <h5 className="text-sm font-bold">About</h5>
            <Button
              variant="link"
              className="p-0"
              onClick={() => setEditProfile((prev) => !prev)}
            >
              <UserRoundPen size={18} />
            </Button>
          </div>
        )}
        {!editProfile && profile.name ? (
          //   Render profile details here
          <div className="space-y-4">
            <p className="text-sm font-medium">
              <span className="text-white/33">Birthday:</span>{" "}
              {profile.birthday} (Age {calculateAge(profile.birthday ?? "")})
            </p>
            <p className="text-sm font-medium">
              <span className="text-white/33">Horoscope:</span>{" "}
              {profile.horoscope}
            </p>
            <p className="text-sm font-medium">
              <span className="text-white/33">Zodiac:</span> {profile.zodiac}
            </p>
            <p className="text-sm font-medium">
              <span className="text-white/33">Height:</span> {profile.height} cm
            </p>
            <p className="text-sm font-medium">
              <span className="text-white/33">Weight:</span> {profile.weight} kg
            </p>
          </div>
        ) : (
          !editProfile && (
            <p className="text-sm font-medium text-white/50 pr-5">
              Add in your about to help others know you better
            </p>
          )
        )}

        {editProfile && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full inline-flex items-center justify-between">
              <h5 className="text-sm font-bold">About</h5>
              {editProfile && (
                <Button
                  variant="link"
                  className="p-0 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#94783E] via-[#F3EDA6] via-[#F8FAE5] via-[#FFE2BE] to-[#D5BE88]"
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save & Update"}
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {/* Display form errors */}
              {Object.keys(form.formState.errors).length > 0 && (
                <div className="text-red-400 text-xs">
                  {Object.entries(form.formState.errors).map(
                    ([field, error]) => (
                      <p key={field}>
                        {field}: {error?.message}
                      </p>
                    )
                  )}
                </div>
              )}
              {/* Display mutation errors */}
              {(createMutation.error || updateMutation.error) && (
                <div className="text-red-400 text-xs">
                  {createMutation.error?.message ||
                    updateMutation.error?.message ||
                    "Failed to save profile"}
                </div>
              )}
              <div className="inline-flex items-center justify-between w-full gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-white/33"
                >
                  Display name:
                </label>
                <FormInput
                  control={form.control as any}
                  name="name"
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
                <FormInput
                  control={form.control as any}
                  type="date"
                  name="birthday"
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
                <FormInput
                  control={form.control as any}
                  type="text"
                  name="horoscope"
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
                <FormInput
                  control={form.control as any}
                  type="text"
                  name="zodiac"
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
                <FormInput
                  control={form.control as any}
                  type="text"
                  name="height"
                  id="height"
                  classWrapper="w-4/6"
                  className="border border-white/22 text-right"
                  rightSlot="cm"
                  onKeyUp={isNumber}
                />
              </div>
              <div className="inline-flex items-center justify-between w-full gap-2">
                <label
                  htmlFor="weight"
                  className="text-sm font-medium text-white/33"
                >
                  Weight:
                </label>
                <FormInput
                  control={form.control as any}
                  type="text"
                  name="weight"
                  id="weight"
                  classWrapper="w-4/6"
                  className="border border-white/22 text-right"
                  rightSlot="kg"
                  onKeyUp={isNumber}
                />
              </div>
            </div>
          </form>
        )}
      </Card>
    );
  }
);

export default AboutCard;
