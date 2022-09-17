// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../_api'

type Data = any

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'GET') {
        res.status(405).end;
        return;
    }

    const result = await client.query('/library/sections/' + req.query.slug + '/all');
    const mediaContainer = result.MediaContainer;
    const data = mediaContainer.Metadata
    res.status(200).json(data)
}