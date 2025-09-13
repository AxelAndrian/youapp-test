import React, { useState, useRef } from "react";
import { cn } from "@/_utils/cn";

interface TagsInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  ({ value = [], onChange, placeholder = "Add tag...", className }, ref) => {
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const tags = value;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === "Enter" || e.key === ",") && input.trim()) {
        e.preventDefault();
        if (!tags.includes(input.trim())) {
          const newTags = [...tags, input.trim()];
          onChange?.(newTags);
        }
        setInput("");
      } else if (e.key === "Backspace" && !input && tags.length) {
        const newTags = tags.slice(0, -1);
        onChange?.(newTags);
      }
    };

    const removeTag = (idx: number) => {
      const newTags = tags.filter((_, i) => i !== idx);
      onChange?.(newTags);
    };

    return (
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 w-full px-4 py-4.5 rounded-xl text-white bg-white/5 focus-within:outline-none text-sm min-h-[48px]",
          className
        )}
      >
        {tags.map((tag, idx) => (
          <span
            key={tag + idx}
            className="flex items-center gap-1 bg-white/10 text-white rounded px-2 py-1 text-xs"
          >
            {tag}
            <button
              type="button"
              className="ml-1 text-white/50 hover:text-white text-xs focus:outline-none"
              onClick={() => removeTag(idx)}
              tabIndex={-1}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={ref || inputRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 min-w-[80px] py-1"
        />
      </div>
    );
  }
);

export default TagsInput;
