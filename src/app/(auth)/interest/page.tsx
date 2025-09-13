"use client";

import GradientLayout from "@/_components/gradientLayout";
import Button from "@/_components/ui/button";
import TagsInput from "@/_components/ui/tags-input";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function InterestPage() {
  const [tagInterests, setTagInterest] = useState<Array<string>>([]);

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
          >
            Save
          </Button>
        </div>
        <div className="px-8">
          <div className="space-y-3 mb-9">
            <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#94783E] via-[#F3EDA6] via-[#F8FAE5] via-[#FFE2BE] to-[#D5BE88]">
              Tell everyone about yourself
            </h2>
            <h1 className="text-xl font-bold text-white">What interest you?</h1>
          </div>
          <TagsInput
            placeholder=""
            value={tagInterests}
            onChange={(tag) => setTagInterest(tag)}
          />
        </div>
      </main>
    </GradientLayout>
  );
}
