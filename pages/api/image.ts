// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  } else if (
    typeof req.query.i !== 'string' ||
    !/\/library\/metadata\/\d{1,}\/thumb\/\d{3,}/.test(req.query.i)
  ) {
    res.status(400).end()
    return
  }

  const request = await axios.get(
    `http://${process.env.PLEX_ADDRESS}:${process.env.PLEX_PORT}${req.query.i}`,
    {
      responseType: 'stream',
      headers: {
        'X-Plex-Token': process.env.PLEX_TOKEN as string,
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