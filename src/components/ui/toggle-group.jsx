import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils.js"
import { toggleVariants } from "@/components/ui/toggle.jsx"

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef(
  ({ className, variant, size, orientation = "horizontal", children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn(
        "flex items-center gap-1",
        orientation === "vertical" ? "flex-col" : "flex-row",
        variant === "outline" && "bg-background rounded-md border border-input p-1",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(
  ({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          context.variant === "outline" && "data-[state=on]:bg-background data-[state=on]:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    )
  }
)

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
