'use client'

import { Badge } from "@/components/ui/badge"

export function DuplicatePropertyBadge() {
  return (
    <Badge 
      variant="secondary" 
      className="bg-[#625676] hover:bg-[#625676]/90 text-white text-xs font-medium px-2 py-0.5"
    >
      Duplicate
    </Badge>
  )
}