// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client from './_api'
import axios from 'axios';
import { PlexApiMetadataResponse, PlexMediaMetadata } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlexMediaMetadata>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  } else if (
    typeof req.query.key !== 'string' ||
    !/\/library\/metadata\/\d{1,}/.test(req.query.key)
  ) {
    res.status(400).end()
    return
  }

  const result = await client.query<PlexApiMetadataResponse<PlexMediaMetadata>>(
    req.query.key
  )
  const mediaContainer = result.MediaContainer
  const { Media, Role, Similar, ...data } = mediaContainer.Metadata[0] as any
  res.status(200).json(data as PlexMediaMetadata)
}