"use client";

import GradientLayout from "@/_components/gradientLayout";
import Button from "@/_components/ui/button";
import Input from "@/_components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <GradientLayout>
      <main className="grid grid-cols-1 gap-6">
        {/* BACK BUTTON  */}
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
        {/* CONTENT */}
        <div className="space-y-8 px-4">
          <h2 className="text-white font-bold text-2xl px-4">Login</h2>
          <div className="space-y-4">
            <Input placeholder="Enter Username/Email" />
            <Input placeholder="Enter Password" type="password" />
          </div>
          <Button className="w-full">Login</Button>
        </div>
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
