"use client"

import Image, { ImageProps } from "next/image"
import { memo } from "react"

interface OptimizedImageProps extends Omit<ImageProps, 'loading'> {
  eager?: boolean
  alt: string // Make alt required
}

const OptimizedImage = ({ eager = false, ...props }: OptimizedImageProps) => {
  return (
    <Image
      {...props}
      loading={eager ? "eager" : "lazy"}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
    />
  )
}

export default memo(OptimizedImage)
