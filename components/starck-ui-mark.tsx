import Image from "next/image"

import { cn } from "@/lib/utils"

function StarckUiMark({ className }: { className?: string }) {
  return (
    <Image
      src="/starck-ui-mark.png"
      alt=""
      aria-hidden="true"
      width={64}
      height={64}
      priority
      className={cn("size-8 shrink-0", className)}
    />
  )
}

export { StarckUiMark }
