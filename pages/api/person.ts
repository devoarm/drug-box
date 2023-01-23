// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from '../../src/database/connection/index'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":       
        const query = await db('person').select('*').orderBy('person_fullname')
      res.status(200).json(query);
      break;

    default:
      break;
  }
}
