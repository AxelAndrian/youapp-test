import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";
import { cn } from "@/_utils/cn";

interface DropdownContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined
);

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> & {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
  Item: typeof DropdownItem;
} = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div
        ref={ref}
        className={cn("relative inline-block text-left", className)}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface DropdownTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  asChild,
}) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown.Trigger must be used within Dropdown");
  const { open, setOpen } = ctx;

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      onClick: (e: any) => {
        (children as any).props?.onClick?.(e);
        setOpen(!open);
      },
      "aria-expanded": open,
    });
  }

  return (
    <button
      type="button"
      className={cn(
        `w-full px-4 py-4.5 rounded-xl text-white text-left bg-white/5 focus:outline-none text-sm border border-white/10 flex items-center justify-between`,
        open ? "ring-2 ring-white/20" : ""
      )}
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      {children}
      <svg
        className={cn(
          "w-4 h-4 ml-2 transition-transform",
          open && "rotate-180"
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

interface DropdownContentProps {
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
}

const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  align = "start",
  className,
}) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown.Content must be used within Dropdown");
  const { open } = ctx;
  // Use a simple fade/slide transition
  return (
    <div
      className={cn(
        "absolute z-10 mt-2 min-w-[10rem] bg-white/10 rounded-xl shadow-lg backdrop-blur border border-white/10 transition-all duration-200 ease-out transform",
        align === "end" ? "right-0" : "left-0",
        open
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
        className
      )}
      style={{ willChange: "opacity, transform" }}
      aria-hidden={!open}
    >
      {children}
    </div>
  );
};

interface DropdownItemProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  className,
}) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown.Item must be used within Dropdown");
  const { setOpen } = ctx;
  return (
    <button
      type="button"
      className={cn(
        "w-full text-left px-4 py-3 text-sm text-white hover:bg-white/20 focus:outline-none",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;

export { Dropdown };
