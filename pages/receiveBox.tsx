import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LayoutMain from "../src/layout/main";
import { getHttp, postHttp } from "../src/service/fetcher";
import { GetServerSideProps, NextPage } from "next";
import { TypeBox, TypeBoxArray } from "../src/interface/box";
import Swal from "sweetalert2";
import { TypePerson, TypePersonArray } from "../src/interface/person";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CardCustom from "../src/components/CardCustom";
import LoadingButtonPrimary from "../src/components/LoadingButtonPrimary";
import { responseType } from "../src/interface/responseType";
import { useRouter } from "next/router";

type Inputs = {
  recipientName: string;
  senderName: string;
  boxNumber: number | undefined;
};

const SendBox: NextPage<{
  boxs: TypeBoxArray | undefined;
  persons: TypePersonArray;
}> = (props) => {
  const { boxs, persons } = props;
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [personList, setPersonList] = useState<any>([]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const routes = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const res: responseType = await postHttp(`/service-box`, {
      ...data,
      serviceType: "receive",
    });
    if (res.status == 200) {
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setValue("boxNumber", undefined);
        setValue("recipientName", "");
        setValue("senderName", "");
        routes.push("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "ล้มเหลว",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(res);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    const optionsPerson = persons.map((item: TypePerson) => {
      return { label: item.person_fullname };
    });
    setPersonList(optionsPerson);
  }, []);

  return (
    <LayoutMain>
      <h1>รับเข้า</h1>
      <CardCustom>
        <FormControl
          fullWidth
          error={Boolean(errors.boxNumber)}
          margin="normal"
        >
          <Controller
            control={control}
            name="boxNumber"
            render={({ field }) => (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={boxs!}
                disableClearable
                // value={field.value}
                // {...field}
                getOptionLabel={(option: TypeBox) =>
                  option && option.drug_box_name
                }
                onChange={(_, data) => {
                  if (data) {
                    setValue("boxNumber", data.drug_box_id);
                  } else {
                    setValue("boxNumber", 0);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="เลือกกล่องยา"
                    error={Boolean(errors.boxNumber)}
                  />
                )}
              />
            )}
            rules={{
              required: "กรุณาเลือกชื่อยา",
            }}
          />

          <FormHelperText>{errors.boxNumber?.message}</FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          error={Boolean(errors.senderName)}
          margin="normal"
        >
          <Controller
            control={control}
            name="senderName"
            render={({ field }) => (
              <Autocomplete
                disablePortal
                freeSolo
                id="combo-box-demo"
                options={personList}
                {...field}
                onChange={(_, data: any) => {
                  if (data) {
                    setValue("senderName", data.label);
                  } else {
                    setValue("senderName", "");
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e: any) => {
                      setValue("senderName", e.target.value);
                    }}
                    label="ชื่อผู้ส่งคืน (ลงเฉพาะชื่อจริง)"
                    error={Boolean(errors.senderName)}
                  />
                )}
              />
            )}
            rules={{
              required: "กรุณากรอกชื่อผู้ส่งคืน",
            }}
          />
          <FormHelperText>{errors.senderName?.message}</FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          error={Boolean(errors.recipientName)}
          margin="normal"
        >
          <Controller
            control={control}
            name="recipientName"
            render={({ field }) => (
              <Autocomplete
                disablePortal
                freeSolo
                options={personList}
                {...field}
                onChange={(_, data: any) => {
                  if (data) {
                    setValue("recipientName", data.label);
                  } else {
                    setValue("recipientName", "");
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e: any) => {
                      setValue("recipientName", e.target.value);
                    }}
                    error={Boolean(errors.recipientName)}
                    label="ชื่อผู้รับยา (ลงเฉพาะชื่อจริง)"
                    fullWidth
                  />
                )}
              />
            )}
            rules={{
              required: "กรุณากรอกชื่อผู้รับ",
            }}
          />
          <FormHelperText>{errors.recipientName?.message}</FormHelperText>
        </FormControl>
        <LoadingButtonPrimary
          lable="บันทึก"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </CardCustom>
    </LayoutMain>
  );
};

export default SendBox;

export async function getServerSideProps() {
  // Fetch data from external API
  const boxs = await getHttp(`/box`);
  const persons = await getHttp(`/person`);
  // Pass data to the page via props
  return { props: { boxs, persons } };
}
