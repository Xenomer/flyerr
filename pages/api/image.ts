// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Query = {
  url: string
  width: number
  height: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  const { url, width, height } = req.query as unknown as Query

  if (
    typeof url !== 'string' ||
    !/\/library\/metadata\/\d{1,}\/thumb\/\d{3,}/.test(url)
  ) {
    res.status(400).end()
    return
  }

  const request = await axios.get(
    `http://${process.env.PLEX_ADDRESS}:${process.env.PLEX_PORT}/photo/:/transcode`,
    {
      responseType: 'stream',
      headers: {
        'X-Plex-Token': process.env.PLEX_TOKEN as string,
      },
      params: {
        width,
        height,
        url,
      },
    }
  )

  res.setHeader('Content-Type', request.headers['content-type'])
  res.status(request.status)
  request.data.pipe(res)

  await new Promise((resolve) => {
    request.data.on('end', resolve)
  })
}