const OG_IMAGE_PATH = '/og-image.png'

/** Title, description and social preview tags shared by every page. */
export function usePageSeo(meta: { title: string, description: string }) {
  useSeoMeta({
    title: meta.title,
    description: meta.description,
    ogTitle: `${meta.title} · Rofiqur Rohman`,
    ogDescription: meta.description,
    ogImage: OG_IMAGE_PATH,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Rofiqur Rohman — Software Developer portfolio',
    twitterCard: 'summary_large_image',
  })
}
