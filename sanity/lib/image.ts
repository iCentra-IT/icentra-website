import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Convenience wrapper for the common "post card thumbnail" case — returns
// null (instead of throwing) when the post has no image yet.
export function postImageUrl(
  source: { asset?: { _ref: string } } | null | undefined,
  width = 600,
  height = 450
): string | null {
  if (!source?.asset) return null
  try {
    return builder.image(source).width(width).height(height).fit('crop').url()
  } catch {
    return null
  }
}
