"use client";

import { ArrowSquareDown, ArrowSquareUp } from "iconsax-reactjs";

export default function ScrollIcon({ direction }: { direction: "up" | "down" }) {
  const Icon = direction === "up" ? ArrowSquareUp : ArrowSquareDown;
  return <Icon variant="Bulk" size={24} color="currentColor" className="scroll-direction-icon" aria-hidden="true" />;
}
