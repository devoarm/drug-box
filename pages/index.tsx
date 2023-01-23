import React, { useEffect, useState } from "react";
import LayoutMain from "../src/layout/main";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getHttp } from "../src/service/fetcher";
import { responseType } from "../src/interface/responseType";
import { TypeBox } from "../src/interface/box";
import moment from "moment";

export default function App() {
  const [boxs, setBoxs] = useState<TypeBox[]>([]);
  const fetchService = async () => {
    const resBox = await getHttp(`box`);
    setBoxs(resBox);
    console.log(resBox);
  };
  useEffect(() => {
    fetchService();
  }, []);

  return (
    <LayoutMain>
      <h1>ติดตามกล่องล่าสุด</h1>
      <TableContainer component={Paper} className="mt-5">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-slate-200">
            <TableRow>
              <TableCell>ชื่อกล่อง</TableCell>
              <TableCell>ผู้ส่ง</TableCell>
              <TableCell>ผู้รับ</TableCell>
              <TableCell>ผู้จัดยา</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>เวลา</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxs?.map((row: TypeBox) => (
              <TableRow
                key={row.drug_box_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.drug_box_name}
                </TableCell>
                <TableCell>{row.current_send_person}</TableCell>
                <TableCell>{row.current_receive_person}</TableCell>
                <TableCell>{row.current_prepare_person}</TableCell>
                <TableCell>
                  {row.drug_box_status == "send" ? (
                    <p className="p-2 bg-green-500 text-center text-white rounded-md">
                      จ่ายออก
                    </p>
                  ) : row.drug_box_status == "receive" ? (
                    <p className="p-2 bg-blue-500 text-center text-white rounded-md">
                      ส่งคืน
                    </p>
                  ) : row.drug_box_status == "prepare" ? (
                    <p className="p-2 bg-orange-500 text-center text-white rounded-md">
                      กำลังจัดกล่อง
                    </p>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  {row.date_time
                    ? moment(row.date_time).format("DD-MM-YYYY HH:mm:ss")
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutMain>
  );
}
