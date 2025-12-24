import * as React from "react"
import { cn } from "@/lib/utils.js"

function Skeleton({
  className,
  animated = true,
  ...props
}) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted/70",
        animated && "animate-pulse",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
