"use client";

import React from "react";
import GradientLayout from "@/_components/gradientLayout";
import Button from "@/_components/ui/button";
import FormInput from "@/_components/ui/form-input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SessionToken } from "@/_libs/cookies";
import { LoginValues, loginSchema } from "./_entities";
import { useLogin } from "./_hooks";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const mutationLogin = useLogin();
  const { isPending, error } = mutationLogin;

  const onSubmit = (values: LoginValues) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username);
    const payload = {
      email: isEmail ? values.username : "",
      username: isEmail ? "" : values.username,
      password: values.password,
    };
    mutationLogin.mutate(payload, {
      onSuccess: (data) => {
        if (data?.access_token) {
          SessionToken.set({ access_token: data.access_token });
          window.location.href = "/";
        } else {
          window.location.href = "/login";
        }
      },
    });
  };

  return (
    <GradientLayout>
      <main className="grid grid-cols-1 gap-6">
        <div className="mt-10 mb-16">
          <Button
            variant="link"
            className="font-bold px-0"
            type="button"
            onClick={() => window.history.back()}
          >
            <ChevronLeft />
            Back
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
          <h2 className="text-white font-bold text-2xl px-4">Login</h2>
          <div className="space-y-4">
            <div>
              <FormInput
                control={control}
                name="username"
                placeholder="Enter Username/Email"
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <FormInput
                control={control}
                name="password"
                type="password"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
          {error && (
            <p className="text-red-400 text-xs">
              Failed to login. Please try again.
            </p>
          )}
        </form>
        <div className="mt-14 inline-flex items-center justify-center gap-1.5 text-white font-medium text-sm">
          <span>No account?</span>
          <Link
            href="/register"
            className="text-[#D5BE88] hover:text-[#D5BE88]/80"
          >
            Register here
          </Link>
        </div>
      </main>
    </GradientLayout>
  );
}
