import { MetadataRoute } from 'next'

// This is a demonstration site and should never be indexed by search engines.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  }
}
