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
      const data = req.body;
      const checkNameSend = await db("person as p").where(
        "p.person_fullname",
        data.senderName
      );
      if (checkNameSend.length < 1) {
        let query = await db("person").insert({
          person_fullname: data.senderName,
        });
      }
      const checkNameReceive = await db("person as p").where(
        "p.person_fullname",
        data.recipientName
      );
      if (checkNameReceive.length < 1) {
        let query = await db("person").insert({
          person_fullname: data.recipientName,
        });
      }

      const currentDrug = await db("drug_box")
        .where("drug_box_id", data.boxNumber)
        .update({
          drug_box_status: data.serviceType,
          current_send_person: data.senderName,
          current_receive_person: data.recipientName,
          date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

      const query = await db("service_box").insert({
        drug_box_id: data.boxNumber,
        sender_name: data.senderName,
        recipient_name: data.recipientName,
        service_type: data.serviceType,
        service_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      res.status(200).json({ status: 200, results: query });
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
