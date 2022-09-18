// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PlexApiDirectoryResponse, PlexLibrary } from '../../../lib/types'
import client from '../_api'

const libraries = process.env.LIBRARIES?.split(',') ?? []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlexLibrary[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end
    return
  }

  const result = await client.query<PlexApiDirectoryResponse<PlexLibrary>>(
    '/library/sections'
  )
  const mediaContainer = result.MediaContainer
  const data = mediaContainer.Directory.filter((library) =>
    libraries.includes(library.title.toLowerCase())
  )
  res.status(200).json(data)
}
