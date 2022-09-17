// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../_api'

type Data = {
    name: string
}

const libraries = process.env.LIBRARIES?.split(',') ?? [];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'GET') {
        res.status(405).end;
        return;
    }

    const result = await client.query('/library/sections');
    const mediaContainer = result.MediaContainer;
    const data = mediaContainer.Directory
        .filter((item: any) => libraries.includes(item.title.toLowerCase()))
    res.status(200).json(data)
}
