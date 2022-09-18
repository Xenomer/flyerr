// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PlexApiMetadataResponse, PlexMedia } from '../../../../lib/types'
import client from '../../_api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlexMedia[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  const result = await client.query<PlexApiMetadataResponse<PlexMedia>>(
    `/library/sections/${req.query.slug}/all`
  )
  const mediaContainer = result.MediaContainer
  const data: PlexMedia[] = mediaContainer.Metadata
    // remove Media prop from each item
    .map(({ Media, ...media }: any) => media)
  res.status(200).json(data)
}