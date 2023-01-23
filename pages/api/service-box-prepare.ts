// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import db from "../../src/database/connection/index";
import { responseType } from "../../src/interface/responseType";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  switch (req.method) {
    case "POST":
      try {
        const data = req.body;
        const checkNameSend = await db("person as p").where(
          "p.person_fullname",
          data.prepareName
        );
        if (checkNameSend.length < 1) {
          let query = await db("person").insert({
            person_fullname: data.prepareName,
          });
        }

        const currentDrug = await db("drug_box")
          .where("drug_box_id", data.boxNumber)
          .update({
            drug_box_status: data.serviceType,
            current_prepare_person: data.prepareName,
            date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
          });

        res.status(200).json({ status: 200, results: currentDrug });
      } catch (error: any) {
        res.json({ status: 500, results: error.message });
      }
      break;
    case "GET":
      const queryDrugCurrent = await db("person")
        .select("*")
        .orderBy("person_fullname");
      res.status(200).json(queryDrugCurrent);
      break;
    default:
      break;
  }
}
